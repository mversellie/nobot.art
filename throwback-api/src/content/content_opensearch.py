import string
from datetime import datetime

from content.content_response import ContentResponse
from exceptions.custom_exceptions import ContentNotFoundException
from opensearch.opensearch_service import OpenSearchService
from opensearchpy import Document, Text,Date, Keyword, Boolean,Integer

class Content(Document):
    creator = Text(fields={'raw': Keyword()})
    description = Text(fields={'raw': Keyword()})
    created = Date()
    url_safe_name = Text(fields={'raw': Keyword()})
    filename = Text()
    name = Text()
    filename_S3 = Text()
    keyword = Text(fields={'raw': Keyword()})
    extension = Text(fields={'raw': Keyword()})
    height = Integer()
    width = Integer()
    is_adult = Boolean()
    tags = Text(fields={'raw': Keyword()})

    class Index:
        name = "content"

    def save(self, ** kwargs):
        return super(Content, self).save(** kwargs)


class ContentOpenSearch:

    def __init__(self):
        self.opensearch = OpenSearchService()

    def get_content_by_creator_and_name(self, user:string, title:string):
        contents = self.opensearch.start_index_search("content").query('match',creator= user).query('match',url_safe_name= title)
        for content in contents:
            return ContentResponse(content.name,content.creator, content.filename_S3,
                                                   content.created, content.description, content.url_safe_name)
        raise ContentNotFoundException("Not found")

    def get_gallery_page_for_user(self, user:string, page:int, page_size:int):
        ret = []
        contents = self.opensearch.start_index_search("content").sort("created").query('match',creator= user).extra(from_=page - 1,size = page_size)
        for content in contents:
            ret.append(ContentResponse(content.name,content.creator, content.filename_S3,
                                       content.created, content.description, content.url_safe_name))
        if len(ret) == 0 and page > 1:
            raise ContentNotFoundException("Not found")
        return ret

    def get_latest(self,page:int, page_size:int):
        ret = []
        contents = self.opensearch.start_index_search("content").sort("created").extra(from_=page - 1,size = page_size)

        for content in contents:
                ret.append(ContentResponse(content.name,content.creator, content.filename_S3,
                                           content.created, content.description, content.url_safe_name))
        if len(ret) == 0 and page > 0:
            raise ContentNotFoundException("Not found")
        return ret


    def save_new_content(self, width:int,height:int,extension:string,
                         creator:string, description:string, filename:string,
                         name:string,created:datetime,content_id:string,
                         filename_S3:string,url_safe_name:string):
        database_content_to_save = Content(width = width,height = height,extension=extension.upper(),
                                                    creator = creator,
                                                    description = description, filename = filename,
                                                    name = name,created = created,content_id = content_id,
                                                    filename_S3= filename_S3,url_safe_name=url_safe_name)
        database_content_to_save.is_adult= False
        print(created)
        self.opensearch.save(database_content_to_save)