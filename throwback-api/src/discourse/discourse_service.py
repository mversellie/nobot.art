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
        self.create_user_endpoint = self.host + "/users.json"
        self.get_topic_endpoint=self.host + "/t"
        self.http = urllib3.PoolManager()

    def make_new_art_topic(self,art_id:string,description:string,username:string):
        body = {"external_id": art_id, "raw": description, "title": art_id,
                "category":str(self.DRAWING_CATEGORY)}
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("POST",self.create_topic_endpoint,body=json.dumps(body),headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),self.create_topic_endpoint)

    def make_new_username_and_get_user_id(self,username:string,external_id,email:string):
        body = {"external_id": [{"keycloak":external_id}], "username": username,"email":email}
        headers = {"Api-Username":self.settings.get("DISCOURSE_API_SERVICE_USERNAME"),"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("POST",self.create_user_endpoint,body=json.dumps(body),headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),self.create_user_endpoint)
        print(response.json())
        return response.json()["user_id"]


    def make_new_post(self, topic_id:string, content:string, username:string):
        body = {"topic_id": topic_id, "raw": content}
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("POST",self.create_topic_endpoint,body=json.dumps(body),headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),self.create_topic_endpoint)


    def get_data_for_topic(self, content_id:string, is_external_id,username):
        if is_external_id:
            endpoint = self.host + "/t/external_id/" +  content_id + ".json"
        else:
            endpoint = self.host + "/t/" + content_id + ".json"
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        print(headers)
        print(endpoint)
        response = self.http.request("GET",endpoint,headers=headers)

        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        comments_raw =  response.json()["post_stream"]["posts"]
        comments:List = []
        for post in comments_raw:
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

    def get_topic_from_external_id(self, external_id):
        endpoint = self.host + "/t/external_id/" +  external_id + ".json"
        response = self.http.request("GET",endpoint)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        return response.json()["id"]

    def delete_topic_by_id_with_user(self, discourse_id,username):
        endpoint = self.host + "/t/" +  discourse_id + ".json"
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("DELETE",endpoint,headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)

    def get_private_messages_for_user(self,username):
        found_topics = {}
        topics_compacted = []

        endpoint = self.host + "/topics/private-messages/" +  username + ".json"
        headers = {"Api-Username":username,"Api-Key":self.api,"Content-Type":"application/json"}
        response = self.http.request("GET",endpoint,headers=headers)
        print(response.json())
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        if len(response.json()["topic_list"]["topics"]) > 0:
            users = response.json()["users"]
            users_as_map = {}

            for aUser in users:
                users_as_map[aUser["id"]] = aUser["username"]
            for topic in response.json()["topic_list"]["topics"]:
                topic_id = topic["id"]
                if topic_id in found_topics:
                    continue
                other_guy= ""
                for user_in_topic in topic["participants"]:
                    temp_username = users_as_map[user_in_topic["user_id"]]
                    if temp_username != username:
                        other_guy = temp_username
                        break
                compacted_topic = {"title": topic["title"], "username": other_guy, "id": topic_id}
                found_topics[topic_id] = True
                topics_compacted.append(compacted_topic)

        endpoint = self.host + "/topics/private-messages-sent/" +  username + ".json"
        response = self.http.request("GET",endpoint,headers=headers)
        if not self.is_successful(response):
            raise DiscourseException(response.status,response.json(),endpoint)
        if len(response.json()["topic_list"]["topics"]) > 0:
            users = response.json()["users"]
            users_as_map = {}
            for aUser in users:
                users_as_map[aUser["id"]] = aUser["username"]
            for topic in response.json()["topic_list"]["topics"]:
                topic_id = topic["id"]
                if topic_id in found_topics:
                    continue
                other_guy= ""
                for user_in_topic in topic["posters"]:
                    temp_username = users_as_map[user_in_topic["user_id"]]
                    if temp_username != username:
                        other_guy = temp_username
                        break
                compacted_topic = {"title": topic["title"], "username": other_guy, "id": topic_id}
                found_topics[topic_id] = True
                topics_compacted.append(compacted_topic)
        return topics_compacted







