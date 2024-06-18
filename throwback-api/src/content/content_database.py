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
                                   content.created, content.description)
        raise ContentNotFoundException("Not found")


    def save_new_content(self, width:int,height:int,extension:string,
                         creator:string, description:string, filename:string,
                         name:string,created:datetime,content_id:string,
                         url_safe_name:string,filename_S3:string):
        database_content_to_save = ThrowbackContent(width = width,height = height,extension=extension.upper(),
                                                    creator = creator,
                                                    description = description, filename = filename,
                                                    name = name,created = created,content_id = content_id,
                                                    filename_S3= filename_S3)
        database_content_to_save.save(force_insert=True)

