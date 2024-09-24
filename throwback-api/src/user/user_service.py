import io
import string

from database.user_database import UserRepository
from discourse.discourse_service import DiscourseService
from PIL import Image
from werkzeug.datastructures import FileStorage

from s3.nobot_s3_service import Nobot_S3Service


class UserService:

    def __init__(self):
        self.s3_service = Nobot_S3Service()
        self.discourse_service = DiscourseService()

    def __init__(self,user_repository:UserRepository,discourse_repository:DiscourseService):
        self.user_repo = user_repository
        self.discourse_service = discourse_repository

    def create_user(self,user_id,username):
        try:
            discourse_id = self.discourse_service.make_new_username_and_get_user_id(username, user_id)
            self.user_repo.save_user(user_id ,username ,discourse_id)
        except Exception as exy:
            raise exy


    def get_user_id_using_username(self, username):
        return self.user_repo.get_user_by_username(username)


    def save_profile_pic(self,pic:FileStorage,user:string):
        with Image.open(pic) as img:
            img.thumbnail((250,250))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format="PNG")
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            filename = "pfp-" + user + ".png"
            self.s3_service.upload_a_file(filename,thumbnail_byte_stream,thumbnail_byte_length)

    def update_bio(self,bio:string,user_id:string):
        self.user_repo.update_bio(bio,user_id)

    def update_header(self,header:string,user_id:string):
        self.user_repo.update_header(header,user_id)

