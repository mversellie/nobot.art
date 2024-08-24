import json
import string
from typing import List

import urllib3

from comments.comment_response import CommentResponse
from exceptions.custom_exceptions import DiscourseException
from settings_service import SettingsService


class DiscourseService:

    DRAWING_CATEGORY=4

    def is_successful(self,res):
        return 200 <= res.status < 300

    def __init__(self):
        self.settings = SettingsService()
        self.api = self.settings.get("DISCOURSE_API")
        self.host = self.settings.get("DISCOURSE_HOST")
        self.create_topic_endpoint = self.host + "/posts"
        self.http = urllib3.PoolManager()

    def make_new_art_topic(self,art_id:string,description:string,username:string):
        body = {"external_id": art_id, "raw": description, "title": art_id,
                "category":str(self.DRAWING_CATEGORY)}
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("POST",self.create_topic_endpoint,body=json.dumps(body),headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),self.create_topic_endpoint)

    def make_new_comment(self, topic_id:string, content:string, username:string):
        body = {"topic_id": topic_id, "raw": content}
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("POST",self.create_topic_endpoint,body=json.dumps(body),headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),self.create_topic_endpoint)


    def get_comments_for_content(self,content_id:string):
        endpoint = self.host + "/t/external_id/" +  content_id + ".json"
        response = self.http.request("GET",endpoint,fields={"include_raw": True})
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        comments_raw =  response.json()["post_stream"]["posts"]
        comments_less_desc = comments_raw[1:len(comments_raw) + 1] if len(comments_raw) > 1 else []
        comments:List = []
        for post in comments_less_desc:
            temp_comment:CommentResponse = CommentResponse()
            temp_comment.created = post["created_at"]
            temp_comment.content = post["cooked"]
            temp_comment.username = post["username"]
            comments.append(temp_comment)
        return comments

    def get_description_for_content(self,content_id:string):
        endpoint = self.host + "/t/external_id/" +  content_id + ".json"
        response = self.http.request("GET",endpoint)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        return response.json()["post_stream"]["posts"][0]["cooked"]

    def get_topic_id_from_external_id(self,external_id):
        endpoint = self.host + "/t/external_id/" +  external_id + ".json"
        response = self.http.request("GET",endpoint)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        return response.json()["id"]







