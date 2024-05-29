from datetime import datetime
from peewee import *
from database_layer import get_database

db = get_database()


# Use if you don't care about table names
class BaseModel(Model):
    class Meta:
        database = db


class Changelog(BaseModel):
    executed_time = TimestampField(default=datetime.now())
    id = AutoField()
    filename = CharField(unique=True)
    success = BooleanField()