import datetime
import string
from typing import List

from opensearchpy import Document, Text,Date, Keyword

from opensearch.opensearch_service import OpenSearchService

class CommentResponse:
    username:string
    posted: datetime.date
    edited: datetime.date
    content:string


class Comment(Document):
    username = Text(fields={'raw': Keyword()})
    thread = Text(fields={'raw': Keyword()})
    posted = Date()
    edited = Date()
    content = Text()

    class Index:
        name = "comments"

    def save(self, ** kwargs):
        return super(Comment, self).save(** kwargs)


class CommentService:

    def __init__(self,opensearch_service:OpenSearchService):
        self.service = opensearch_service


    def add_a_comment(self,thread:string,content:string,username:string):
        comment:Comment = Comment()
        comment.thread=thread
        comment.edited= datetime.datetime.now()
        comment.created= datetime.datetime.now()
        comment.content=content
        comment.username=username
        self.service.save(comment)

    def get_all_comments_for_thread(self,thread:string):
        print("thread: " + thread)
        search = self.service.start_index_search("comments").sort("created").query("match",thread = thread)
        response_from_search = search.execute()
        comments:List = []
        for result in response_from_search:
            temp_comment:CommentResponse = CommentResponse()
            temp_comment.edited = result.edited
            temp_comment.created = result.created
            temp_comment.content = result.content
            temp_comment.username = result.username
            comments.append(temp_comment)
        return comments

