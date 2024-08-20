from peewee import *
from database.database_layer import get_database

db = get_database()

class NobotSubscription(Model):
    sub_id = PrimaryKeyField()
    username = CharField()
    type = IntegerField()
    target = CharField()
    subscribed = TimestampField()
    class Meta:
        database=db
        table_name = 'nobot_subs'

class NobotSubscriptionTypes(Model):
    type_id = PrimaryKeyField()
    name = CharField()
    class Meta:
        database=db
        table_name = 'nobot_types'
