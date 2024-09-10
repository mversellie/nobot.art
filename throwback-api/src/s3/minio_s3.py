from sqlite3 import connect

from s3.abstract_s3 import AbstractS3Client
from settings_service import SettingsService
from minio import Minio


class MinioS3Client(AbstractS3Client):

    def __init__(self):
        self.s3_client = None
        self.settings = SettingsService()
        self.bucket = self.settings.get("S3_BUCKET")

    def connect(self):
        self.s3_client = Minio(self.settings.get("S3_URL"),
                               access_key=self.settings.get("S3_ACCESS"),
                               secret_key=self.settings.get("S3_SECRET"))
        bucket_exists = self.s3_client.bucket_exists(self.bucket)
        if bucket_exists:
            print("bucket exists: " + self.bucket)
        else:
            self.s3_client.make_bucket(self.bucket)
            print("created bucket: " + self.bucket)

    def upload_file(self,filename,data,filesize):
        if self.s3_client is None:
            connect(self)
        self.s3_client.put_object(self.bucket,filename,data=data,length=filesize)
