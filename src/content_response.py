import string
from datetime import date


class ContentResponse:
    contentId:string
    title:string
    creator:string
    link:string
    thumbnail:string
    createdDate:date
    description:string

    def __init__(self,title:string,creator:string,link:string,thumbnail:string,
                 created_date:date,desc:string,id:string):
        self.title = title
        self.contentId = id
        self.link = link
        self.desc = desc
        self.creator = creator
        self.description = desc
        self.thumbnail = thumbnail
        self.createdDate = created_date

