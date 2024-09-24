import string

from exceptions.custom_exceptions import UserNotFoundException
from database.database_objects import ThrowbackUser

class UserRepository:
    def get_user_by_username(self, username:string):
        try:
            return ThrowbackUser.get().where(ThrowbackUser.username == username)
        except ThrowbackUser.DoesNotExist:
            raise UserNotFoundException("Not found")

    def save_user(self, user_id:string, username:string,discourse_id:string):
        ThrowbackUser.create(user_id = user_id, username = username,discourse_id=discourse_id)

    def update_bio(self, bio:string,user_id:string):
        ThrowbackUser.update(bio = bio).where(ThrowbackUser.user_id == user_id).execute()

    def update_header(self, header:string,user_id:string):
        ThrowbackUser.update(header = header).where(ThrowbackUser.user_id == user_id).execute()
