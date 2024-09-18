import string
from datetime import datetime

from content.content_response import ContentResponse
from exceptions.custom_exceptions import ContentNotFoundException
from peewee import *
from database.database_objects import ThrowbackContent,ThrowbackUser,NobotContentUserAction
from content.content_response import ContentUserMetaData



class ContentRepository:

    def get_content_by_username_and_content_name(self, username:string, content_name:string):
        contents = (ThrowbackContent.select()
                    .join(ThrowbackUser, on=(ThrowbackContent.creator_id == ThrowbackUser.user_id))
                    .where((ThrowbackContent.url_safe_name == content_name) & (ThrowbackUser.username == username)))
        for content in contents:
            return ContentResponse(content.name,content.creator_id.username, content.filename_S3,
                                   content.created, "", content.url_safe_name,content.content_id)
        raise ContentNotFoundException("Not found")

    def get_gallery_page_for_user(self, username:string, page:int, page_size:int):
        meta_sub = (NobotContentUserAction.select(NobotContentUserAction.content_id.alias("content_id"), fn.SUM(NobotContentUserAction.like_diff).alias('likes'),
                                                  fn.COUNT(NobotContentUserAction.content_id).alias('views') )
                    .group_by(NobotContentUserAction.content_id))

        contents = list(ThrowbackContent.select(ThrowbackContent.content_id,ThrowbackContent.filename_S3,ThrowbackContent.created,ThrowbackContent.url_safe_name,ThrowbackContent.name,
                                                ThrowbackUser.username,meta_sub.c.likes,meta_sub.c.views)
                        .join_from(ThrowbackContent,ThrowbackUser)
                        .join(meta_sub,on =(ThrowbackContent.content_id == meta_sub.c.content_id))
                        .where(ThrowbackUser.username== username).paginate(page,page_size).dicts())
        ret = self.convert_content_data_to_response(contents)
        if len(ret) == 0 and page > 0:
            raise ContentNotFoundException("Not found")
        return ret

    def get_latest(self,page:int, page_size:int):
        meta_sub = (NobotContentUserAction.select(NobotContentUserAction.content_id.alias("content_id"), fn.SUM(NobotContentUserAction.like_diff).alias('likes'),
                                                 fn.COUNT(NobotContentUserAction.content_id).alias('views') )
                                                .group_by(NobotContentUserAction.content_id))

        contents = list(ThrowbackContent.select(ThrowbackContent.content_id,ThrowbackContent.filename_S3,ThrowbackContent.created,ThrowbackContent.url_safe_name,ThrowbackContent.name,
                                            ThrowbackUser.username,meta_sub.c.likes,meta_sub.c.views)
                        .join_from(ThrowbackContent,ThrowbackUser)
                        .join(meta_sub,on =(ThrowbackContent.content_id == meta_sub.c.content_id)).paginate(page,page_size).dicts())
        ret = self.convert_content_data_to_response(contents)
        if len(ret) == 0 and page > 0:
            raise ContentNotFoundException("Not found")
        return ret


    def save_new_content(self, width:int, height:int, extension:string,
                         creator_id:string, filename:string,
                         name:string, created:datetime, content_id:string,
                         filename_S3:string, url_safe_name:string):
        ThrowbackContent.create(width = width, height = height, extension=extension.lower(),
                                                    creator_id = creator_id, filename = filename,
                                                    name = name, created = created, content_id = content_id,
                                                    filename_S3= filename_S3, url_safe_name=url_safe_name.lower())

    def convert_content_data_to_response(self,database_response):
        ret = []
        for content in database_response:
            likes = 0
            if not content["likes"] is None:
                likes = content["likes"]
            content_comp = ContentResponse(content["name"],content["username"], content["filename_S3"],
                                           content["created"], "", content["url_safe_name"],content["content_id"])
            content_comp.userMeta = ContentUserMetaData(likes,0,content["views"],0)
            ret.append(content_comp)
        return ret