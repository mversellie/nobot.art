import string
from datetime import datetime

from content.content_response import ContentResponse
from database.user_database import ThrowbackUser
from exceptions.custom_exceptions import ContentNotFoundException
from database.database_layer import get_database
from peewee import *

db = get_database()

class ThrowbackContent(Model):
    name = CharField()
    width = IntegerField()
    height = IntegerField()
    content_id = PrimaryKeyField(primary_key=True)
    creator_id = ForeignKeyField(ThrowbackUser,'user_id')
    extension = CharField()
    created = DateField(null=True)
    filename = CharField()
    filename_S3 = CharField(unique=True)
    adult = BooleanField()
    url_safe_name = CharField()
    class Meta:
        database = db
        table_name = 'nobot_content'

class ContentRepository:

    def __init__(self):
        self.database = db

    def get_content_by_username_and_content_name(self, username:string, content_name:string):
        contents = (ThrowbackContent.select()
                    .join(ThrowbackUser, on=(ThrowbackContent.creator_id == ThrowbackUser.user_id))
                    .where((ThrowbackContent.url_safe_name == content_name) & (ThrowbackUser.username == username)))
        for content in contents:
            return ContentResponse(content.name,content.creator_id.username, content.filename_S3,
                                   content.created, "", content.url_safe_name,content.content_id)
        raise ContentNotFoundException("Not found")

    def get_gallery_page_for_user(self, username:string, page:int, page_size:int):
        ret = []
        contents = (ThrowbackContent.select().paginate(page,page_size)
                    .join(ThrowbackUser, on=(ThrowbackContent.creator_id == ThrowbackUser.user_id))
                    .order_by(ThrowbackContent.created.desc()).where((ThrowbackUser.username == username)))
        for content in contents:
            ret.append(ContentResponse(content.name,content.creator_id.username, content.filename_S3,
                                       content.created, "", content.url_safe_name,content.content_id))
        if len(ret) == 0 and page > 0:
            raise ContentNotFoundException("Not found")
        return ret

    def get_latest(self,page:int, page_size:int):
        ret = []
        contents = (ThrowbackContent.select()
                    .join(ThrowbackUser, on=(ThrowbackContent.creator_id == ThrowbackUser.user_id))
                    .paginate(page,page_size)
                    .order_by(ThrowbackContent.created.desc()))
        for content in contents:
            ret.append(ContentResponse(content.name,content.creator_id.username, content.filename_S3,
                                       content.created, "", content.url_safe_name,content.content_id))
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

