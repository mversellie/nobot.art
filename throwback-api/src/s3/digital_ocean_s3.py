from s3.abstract_s3 import AbstractS3Client
from settings_service import SettingsService
import boto3
from botocore.config import Config

class DigitalOceanS3(AbstractS3Client):
    def __init__(self):
        self.s3_client = None
        self.settings = SettingsService()
        self.bucket = self.settings.get("S3_BUCKET")
        self.session = None

    def connect(self):
        self.session = boto3.session.Session()
        self.s3_client = self.session.client('s3',
                        region_name=self.settings.get("S3_REGION"),
                        endpoint_url=self.settings.get("S3_URL"),
                        aws_access_key_id=self.settings.get("S3_ACCESS"),
                        aws_secret_access_key=self.settings.get("S3_SECRET"),
                        config=Config(signature_version='s3v4'))

    def upload_file(self,filename,data,filesize):
        if self.s3_client is None:
            self.connect()
        self.s3_client.upload_fileobj(data,self.bucket,filename)
        resource = self.session.resource("s3",endpoint_url = self.settings.get("S3_URL"),
                                         region_name = self.settings.get("S3_REGION"),
                                         aws_access_key_id=self.settings.get("S3_ACCESS"),
                                         aws_secret_access_key=self.settings.get("S3_SECRET"))
        resource.Object(self.bucket,filename).Acl().put(ACL='public-read')