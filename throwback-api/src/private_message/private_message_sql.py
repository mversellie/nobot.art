from peewee import *
from database.database_layer import get_database

db = get_database()

class NobotPrivateMessage(Model):
    pm_id = PrimaryKeyField()
    username = CharField()
    title = CharField()
    created = TimestampField()
    last_modified = TimestampField()
    class Meta:
        database=db
        table_name = 'nobot_private_messages'