import io
import string
import time
import uuid

from PIL import Image
from minio import Minio
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from content_response import ContentResponse
from database_layer import get_database
from database_objects import ThrowbackContent
from settings_service import get_settings
from src.custom_exceptions import ContentNotFoundException


class FileToSave:

    def __init__(self,name:string,file_data:FileStorage,creator:string, description:string,filename:string):
        self.name=name
        self.file_data = file_data
        self.creator = creator
        self.description = description
        self.filename = filename


class ContentService:

    def __init__(self):
        self.settings = get_settings("../settings.yml")
        self.s3_settings = self.settings['s3'];
        self.s3_client = Minio('localhost:9000',
                       access_key=self.s3_settings['access'],
                       secret_key=self.s3_settings['secret'])
        self.bucket = self.s3_settings['bucket']
        bucket_exists = self.s3_client.bucket_exists(self.bucket)
        if bucket_exists:
            print("bucket exists: " + self.bucket)
        else:
            self.s3_client.make_bucket(self.bucket)
            print("created bucket: " + self.bucket)
        self.database = get_database()

    def get_content_by_creator_and_name(self, user:string, title:string):
        contents = ThrowbackContent.select().where(
            (ThrowbackContent.url_safe_name == title) & (ThrowbackContent.creator == user))
        for content in contents:
            gack = ContentResponse(content.name,content.creator, content.filename_S3,
                                   content.created, content.description)
            return gack

    def save_content(self,file:FileToSave):
        file_image_bytes = file.file_data
        with Image.open(file_image_bytes) as img:
            file_sections = file.filename.split(".")
            extension = file_sections[len(file_sections) - 1]
            file_id = str(uuid.uuid4())
            full_storage_name = secure_filename(file.name + "-" + file.creator + "." + extension.lower())
            image_format = img.format.lower()
            if not (image_format.lower() == extension.lower()):
                check = (image_format.lower() == 'jpeg') and (extension.lower() == 'jpg')
                if check:
                    pass
                else:
                    print("Formats don't match for " + file_id + " something is wrong.  Exiting.")
                    return
            full_size_buffer = io.BytesIO()
            img.save(full_size_buffer,format=image_format.upper())
            full_size_file_length = full_size_buffer.getbuffer().nbytes
            full_size_buffer.seek(0)
            self.s3_client.put_object(self.bucket,"full-" + full_storage_name,data=full_size_buffer,
                                      length=full_size_file_length)
            width = img.width
            height = img.height
            cur_time = time.time()
            img.thumbnail((1280,1280))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format=image_format.upper())
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            self.s3_client.put_object(self.bucket,full_storage_name,thumbnail_byte_stream,thumbnail_byte_length)
            database_content_to_save = ThrowbackContent(width=width,height=height,extension=image_format.upper(),
                                                creator = file.creator,
                                                description = file.description, filename = file.filename,
                                                name = file.name,created = cur_time,content_id = file_id,
                                                        url_safe_name = secure_filename(file.name),
                                                        filename_S3=full_storage_name)
            database_content_to_save.save()
