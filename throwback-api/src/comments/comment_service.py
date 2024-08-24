import string

from discourse.discourse_service import DiscourseService



class CommentService:

    def __init__(self,comment_service:DiscourseService):
        self.service = comment_service

    def add_a_comment(self, content_id:string, content:string, username:string):
        topic_id = self.service.get_topic_id_from_external_id(content_id)
        self.service.make_new_comment(topic_id, content, username)

    def get_all_comments_for_thread(self, content_id:string):
        return self.service.get_comments_for_content(content_id)
