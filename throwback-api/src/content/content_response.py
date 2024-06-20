import string


class ContentResponse:

    def __init__(self, title:string, creator:string, s3_filename:string,
                 created_date:string, desc:string,url_safe_name:string):
        self.title = title
        self.filename = s3_filename
        self.creator = creator
        self.description = desc
        self.createdDate = created_date
        self.url_safe_name = url_safe_name

