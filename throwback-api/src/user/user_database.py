from peewee import *
from database.database_layer import get_database

db = get_database()

class ThrowbackUser(Model):
    throwback_id = PrimaryKeyField()
    username = CharField(unique=True)
    provider_id = CharField(unique=True)
    provider_platform_id = IntegerField()
    joined = TimestampField(null=True)
    email = CharField(unique=True)
    class Meta:
        database=db
        table_name = 'throwback_users'