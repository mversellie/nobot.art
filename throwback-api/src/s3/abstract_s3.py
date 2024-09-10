from abc import ABC, abstractmethod


class AbstractS3Client(ABC):
    @abstractmethod
    def upload_file(self,filename,data,filesize):
        return NotImplemented