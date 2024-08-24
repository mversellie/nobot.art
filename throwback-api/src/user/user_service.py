from database.user_database import UserRepository


class UserService:
    def __init__(self,user_repository:UserRepository):
        self.user_repo = user_repository

    def create_user(self,user_id,username,discourse_id):
        self.user_repo.save_user(user_id ,username ,discourse_id)

    def get_user_id_using_username(self, username):
        return self.user_repo.get_user_by_username(username)

