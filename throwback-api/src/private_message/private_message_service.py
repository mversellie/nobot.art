import string

from discourse.discourse_service import DiscourseService


class PrivateMessageService:
    def __init__(self,discourseService:DiscourseService):
        self.discourseService = discourseService

    def get_private_messages(self,username:string):
        return self.discourseService.get_private_messages_for_user(username)

    def get_private_message(self,username:string,id:string):
        return self.discourseService.get_data_for_topic(id,False,username)

    def reply_to_private_message(self,username:string,id:string,content:string):
        return self.discourseService.make_new_post(id, content, username)

    def delete_a_private_message(self,username:string,id:string):
        self.discourseService.delete_topic_by_id_with_user(id,username)


