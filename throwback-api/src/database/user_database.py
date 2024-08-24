import string

from peewee import *
from database.database_layer import get_database
from exceptions.custom_exceptions import UserNotFoundException

db = get_database()

class ThrowbackUser(Model):
    user_id = CharField(primary_key=True)
    username = CharField(unique=True)
    discourse_id = CharField(unique=True)
    class Meta:
        database=db
        table_name = 'nobot_users'


class UserRepository:

    def __init__(self):
        self.database = db

    def get_user_by_username(self, username:string):
        try:
            return ThrowbackUser.get().where(ThrowbackUser.username == username)
        except ThrowbackUser.DoesNotExist:
            raise UserNotFoundException("Not found")

    def save_user(self, user_id:string, username:string,discourse_id:string):
        ThrowbackUser.create(user_id = user_id, username = username,discourse_id=discourse_id)
