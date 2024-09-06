import io
import string
import uuid
from datetime import datetime

from PIL import Image

from database.content_database import ContentRepository
from content.content_response import ContentResponse
from minio import Minio
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from discourse.discourse_service import DiscourseService
from settings_service import SettingsService


class FileToSave:

    name:string
    file_data:FileStorage
    creator:string
    description:string
    filename:string
    creator_id:string

    def __init__(self):
        pass

    def long_con(name:string,file_data:FileStorage,creator:string, description:string,filename:string):
        base:FileToSave = FileToSave()
        base.name=name
        base.file_data = file_data
        base.creator = creator
        base.description = description
        base.filename = filename
        return base

    def dict_con(inputDict:dict):
        base:FileToSave = FileToSave()
        base.name=inputDict["name"]
        if "file_data" in inputDict:
            base.file_data = inputDict["file_data"]
        base.creator = inputDict["creator"]
        base.description = inputDict["description"]
        base.filename = inputDict["filename"]
        base.creator_id = inputDict["creator_id"]
        return base

class ContentService:

    def __init__(self):
        #This Line is needed for intializing connection after init
        self.s3_client = None
        self.settings = SettingsService()
        self.content_repository = ContentRepository()
        self.discourse_service = DiscourseService()
        self.bucket = self.settings.get("S3_BUCKET")

    def connect_minio(self):
        if self.s3_client is None:
            self.s3_client = Minio(self.settings.get("S3_URL"),
                                   access_key=self.settings.get("S3_ACCESS"),
                                   secret_key=self.settings.get("S3_SECRET"))
            bucket_exists = self.s3_client.bucket_exists(self.bucket)
            if bucket_exists:
                print("bucket exists: " + self.bucket)
            else:
                self.s3_client.make_bucket(self.bucket)
                print("created bucket: " + self.bucket)

    def get_content_by_username_and_title(self, user:string, title:string):
        ret = self.content_repository.get_content_by_username_and_content_name(user, title)
        ret.description = self.discourse_service.get_description_for_content(ret.content_id)
        return ret

    def get_gallery_page_for_user(self, username:string, page:int, page_size:int):
        return self.content_repository.get_gallery_page_for_user(username, page, page_size)

    def get_latest(self,page:int,page_size:int):
        return self.content_repository.get_latest(page,page_size)

    def save_profile_pic(self,pic:FileStorage,user:string):
        self.connect_minio()
        with Image.open(pic) as img:
            img.thumbnail((250,250))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format="PNG")
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            filename = "pfp-" + user + ".png"
            self.s3_client.put_object(self.bucket,filename,thumbnail_byte_stream,thumbnail_byte_length)

    def save_content(self,file:FileToSave):
        self.connect_minio()
        file_image_bytes = file.file_data
        with Image.open(file_image_bytes) as img:
            file_sections = file.filename.split(".")
            extension = file_sections[len(file_sections) - 1]
            file_id = str(uuid.uuid4())
            full_storage_name = secure_filename(file_id + "." + extension.lower())
            image_format = img.format.lower()
            if not (image_format.lower() == extension.lower()):
                check = (image_format.lower() == 'jpeg') and (extension.lower() == 'jpg')
                if check:
                    pass
                else:
                    print("Formats don't match for " + full_storage_name + " something is wrong.  Exiting.")
                    return
            full_size_buffer = io.BytesIO()
            img.save(full_size_buffer,format=image_format.upper())
            full_size_file_length = full_size_buffer.getbuffer().nbytes
            full_size_buffer.seek(0)
            self.s3_client.put_object(self.bucket,"full-" + full_storage_name,data=full_size_buffer,
                                      length=full_size_file_length)
            width = img.width
            height = img.height
            cur_time = datetime.now()
            img.thumbnail((250,250))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format=image_format.upper())
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            self.s3_client.put_object(self.bucket,full_storage_name,thumbnail_byte_stream,thumbnail_byte_length)
            creator_id=file.creator_id
            self.discourse_service.make_new_art_topic(file_id,file.description,file.creator)
            self.content_repository.save_new_content(width=width, height=height, extension=image_format,
                                                     creator_id=creator_id, filename= file.filename,
                                                     name = file.name, created = cur_time, content_id= file_id,
                                                     filename_S3=full_storage_name, url_safe_name=secure_filename(file.name))
            return ContentResponse(file.name,file.creator, full_storage_name,
                                   cur_time, file.description, secure_filename(file.name),file_id)

