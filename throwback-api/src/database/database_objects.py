from database.database_layer import get_database
from peewee import *

db = get_database()


class ThrowbackUser(Model):
    user_id = CharField(primary_key=True)
    username = CharField(unique=True)
    discourse_id = CharField(unique=True)
    class Meta:
        database=db
        table_name = 'nobot_users'

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

class NobotContentUserAction(Model):
    content_id = ForeignKeyField(ThrowbackContent,'content_id')
    viewer_id = ForeignKeyField(ThrowbackUser,'user_id')
    like_diff = IntegerField(null=True)
    last_viewed = DateField(null=True)
    last_like_change = DateField(null=True)
    class Meta:
        database = db
        table_name = 'nobot_content_user_action'
        primary_key=CompositeKey('content_id', 'viewer_id')