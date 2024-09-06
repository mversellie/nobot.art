from database.user_database import UserRepository
from discourse.discourse_service import DiscourseService


class UserService:
    def __init__(self,user_repository:UserRepository,discourse_repository:DiscourseService):
        self.user_repo = user_repository
        self.discourse_service = discourse_repository

    def create_user(self,user_id,username,email):
        discourse_id = self.discourse_service.make_new_username_and_get_user_id(username, user_id, email)
        self.user_repo.save_user(user_id ,username ,discourse_id)

    def get_user_id_using_username(self, username):
        return self.user_repo.get_user_by_username(username)

