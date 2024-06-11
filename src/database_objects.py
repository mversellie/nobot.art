from peewee import *
from database_layer import get_database

db = get_database()


# Use if you don't care about table names
class BaseModel(Model):
    class Meta:
        database = db


class ThrowbackUser(Model):
    throwback_id = CharField(unique=True)
    username = CharField(unique=True)
    provider_id = CharField(unique=True)
    provider_platform_id = IntegerField()
    joined = TimestampField(null=True)
    email = CharField(unique=True)
    class Meta:
        database=db
        table_name = 'throwback_users'

class ThrowbackContent(Model):
    name = CharField()
    width = IntegerField()
    height = IntegerField()
    content_id = CharField(unique=True)
    creator = CharField()
    description = CharField()
    extension = CharField()
    created = TimestampField(null=True)
    filename = CharField()
    class Meta:
        database = db
        table_name = 'throwback_content'
