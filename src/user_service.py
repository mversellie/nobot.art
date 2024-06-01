import string
from abc import abstractmethod


class UserService:

    @abstractmethod
    def __init__(self,connection_settings):
        pass

    @abstractmethod
    def get_generic_user(self, username:string):
        pass

    @abstractmethod
    def create_generic_user(self,username:string,email:string,password:string):
        pass
