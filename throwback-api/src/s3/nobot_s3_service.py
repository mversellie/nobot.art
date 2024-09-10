from s3.digital_ocean_s3 import DigitalOceanS3
from s3.minio_s3 import MinioS3Client
from settings_service import SettingsService

class Nobot_S3Service:
    def __init__(self):
        self.settings = SettingsService()
        provider = self.settings.get("S3_PROVIDER")
        if provider == "DO_SPACES":
            self.s3_client = DigitalOceanS3()
        else:
            self.s3_client = MinioS3Client()

    def upload_a_file(self,filename,data,filesize):
        self.s3_client.upload_file(filename,data, filesize)