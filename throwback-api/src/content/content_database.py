import string
from datetime import datetime

from content.content_response import ContentResponse
from exceptions.custom_exceptions import ContentNotFoundException
from database.database_layer import get_database
from peewee import *

db = get_database()

class ThrowbackContent(Model):
    name = CharField()
    width = IntegerField()
    height = IntegerField()
    content_id = PrimaryKeyField()
    creator = CharField()
    description = CharField()
    extension = CharField()
    created = TimestampField(null=True)
    filename = CharField()
    filename_S3 = CharField()
    mature = BooleanField()
    url_safe_name = CharField()
    class Meta:
        database = db
        table_name = 'throwback_content'

class ContentRepository:

    def __init__(self):
        self.database = db

    def get_content_by_creator_and_name(self, user:string, title:string):
        contents = ThrowbackContent.select().where(
            (ThrowbackContent.url_safe_name == title) & (ThrowbackContent.creator == user))
        for content in contents:
            return ContentResponse(content.name,content.creator, content.filename_S3,
                                   content.created, content.description, content.url_safe_name)
        raise ContentNotFoundException("Not found")

    def get_gallery_page_for_user(self, user:string, page:int, page_size:int):
        ret = []
        contents = (ThrowbackContent.select().paginate(page,page_size)
            .order_by(ThrowbackContent.created.desc()).where((ThrowbackContent.creator == user)))
        for content in contents:
            ret.append(ContentResponse(content.name,content.creator, content.filename_S3,
                                   content.created, content.description, content.url_safe_name))
        if len(ret) == 0 and page > 0:
            raise ContentNotFoundException("Not found")
        return ret

    def get_latest(self,page:int, page_size:int):
        ret = []
        contents = (ThrowbackContent.select().paginate(page,page_size)
                    .order_by(ThrowbackContent.created.desc()))
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
        database_content_to_save = ThrowbackContent(width = width,height = height,extension=extension.upper(),
                                                    creator = creator,
                                                    description = description, filename = filename,
                                                    name = name,created = created,content_id = content_id,
                                                    filename_S3= filename_S3,url_safe_name=url_safe_name)
        database_content_to_save.save(force_insert=True)

