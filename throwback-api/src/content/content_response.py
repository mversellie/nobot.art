import string
import datetime


class ContentResponse:

    def __init__(self, title:string, creator:string, s3_filename:string,
                 created_date:string, desc:string,url_safe_name:string,content_id:string):
        self.title = title
        self.filename = s3_filename
        self.creator = creator
        self.description = desc
        self.createdDate = created_date
        self.url_safe_name = url_safe_name
        self.content_id = content_id


def content_response_serialize(obj):
    if isinstance(obj, datetime.date):
        return dict(year=obj.year, month=obj.month, day=obj.day)

    return obj.__dict__


