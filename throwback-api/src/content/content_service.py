import io
import string
import uuid
from datetime import datetime

from PIL import Image

from content.content_user_meta_service import ContentUserMetaService
from database.content_database import ContentRepository
from content.content_response import ContentResponse, ContentUserMetaData
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from database.content_user_action_database import NobotContentUserActionRepository
from discourse.discourse_service import DiscourseService
from s3.nobot_s3_service import Nobot_S3Service
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
        self.s3_service = Nobot_S3Service()
        self.settings = SettingsService()
        self.content_repository = ContentRepository()
        self.discourse_service = DiscourseService()
        self.meta_service= ContentUserMetaService(NobotContentUserActionRepository())

    def get_content_by_username_and_title(self, user:string, title:string):
        ret = self.content_repository.get_content_by_username_and_content_name(user, title)
        ret.description = self.discourse_service.get_description_for_content(ret.content_id)
        return ret

    def get_gallery_page_for_user(self, username:string, page:int, page_size:int):
        return self.content_repository.get_gallery_page_for_user(username, page, page_size)

    def get_latest(self,page:int,page_size:int):
        body = self.content_repository.get_latest(page,page_size)
        res = []
        for content in body:
            temp_content = content
            if content.userMeta is None:
                temp_content.userMeta = ContentUserMetaData(0,0,0,0)
            res.append(temp_content)
        return res

    def save_content(self,file:FileToSave):
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
            self.s3_service.upload_a_file("full-" + full_storage_name,full_size_buffer,full_size_file_length)
            width = img.width
            height = img.height
            cur_time = datetime.now()
            img.thumbnail((250,250))
            thumbnail_byte_stream = io.BytesIO()
            img.save(thumbnail_byte_stream, format=image_format.upper())
            thumbnail_byte_length=thumbnail_byte_stream.getbuffer().nbytes
            thumbnail_byte_stream.seek(0)
            self.s3_service.upload_a_file(full_storage_name,thumbnail_byte_stream,thumbnail_byte_length)
            creator_id=file.creator_id
            self.discourse_service.make_new_art_topic(file_id,file.description,file.creator)
            self.content_repository.save_new_content(width=width, height=height, extension=image_format,
                                                     creator_id=creator_id, filename= file.filename,
                                                     name = file.name, created = cur_time, content_id= file_id,
                                                     filename_S3=full_storage_name, url_safe_name=secure_filename(file.name))
            self.meta_service.view_content(creator_id,file_id)
            return ContentResponse(file.name,file.creator, full_storage_name,
                                   cur_time, file.description, secure_filename(file.name),file_id)

