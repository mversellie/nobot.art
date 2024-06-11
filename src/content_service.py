import datetime
import io
import json
import string
import time
import uuid

from PIL import Image
from minio import Minio

from content_response import ContentResponse
from settings_service import get_settings
from database_layer import get_database
from database_objects import ThrowbackContent
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage


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

    def get_content_by_id(self,id:string):
        return json.dumps(self.content_mock().__dict__,indent=4, sort_keys=True, default=str)

    def get_new_file_id(self,extension):
        bucket_tries = 0
        file_id = str(uuid.uuid4())
        while bucket_tries < 3:
            full_file_id = file_id + "." + extension
            bucket_tries = bucket_tries + 1
            try:
                self.s3_client.stat_object(self.bucket,full_file_id)
                file_id = str(uuid.uuid4())
            except:
                return file_id

    def save_content(self,file:FileToSave):
        file_image_bytes = file.file_data
        with Image.open(file_image_bytes) as img:
            file_sections = file.filename.split(".")
            extension = file_sections[len(file_sections) - 1]
            file_id = str(uuid.uuid4())
            full_storage_name = secure_filename(file.name + "-" + file.creator + "." + extension.lower())
            format = img.format.lower()
            if not (format.lower() == extension.lower()):
                check = (format.lower() == 'jpeg') and (extension.lower() == 'jpg')
                if check:
                    pass
                else:
                    print("Formats don't match for " + file_id + " something is wrong.  Exiting.")
                    return
            full_size_buffer = io.BytesIO()
            img.save(full_size_buffer,format=format.upper())
            full_size_file_length = full_size_buffer.getbuffer().nbytes
            full_size_buffer.seek(0)
            self.s3_client.put_object(self.bucket,"full-" + full_storage_name,data=full_size_buffer,
                                      length=full_size_file_length)
            width = img.width
            height = img.height
            cur_time = time.time()
            img.thumbnail((1280,1280))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format=format.upper())
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            self.s3_client.put_object(self.bucket,full_storage_name,thumbnail_byte_stream,thumbnail_byte_length)
            database_content_to_save = ThrowbackContent(width=width,height=height,extension=format.upper(),
                                                creator = file.creator,
                                                description = file.description, filename = file.filename,
                                                name = file.name,created = cur_time,content_id = file_id)
            database_content_to_save.save()


    def content_mock(self):
            base_url = "http://localhost:4200"
            return ContentResponse("aTitle","aCreator",base_url + "/assets/img/vue2.png",base_url + "/assets/img/thumb-vue2.png",
                                   datetime.datetime(2024, 12, 17),"desc","vue2")

