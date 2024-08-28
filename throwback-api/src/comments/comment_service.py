import string

from discourse.discourse_service import DiscourseService



class CommentService:

    def __init__(self,comment_service:DiscourseService):
        self.service = comment_service

    def add_a_comment(self, content_id:string, content:string, username:string):
        topic_id = self.service.get_topic_from_external_id(content_id)
        self.service.make_new_post(topic_id, content, username)

    def get_all_comments_for_thread(self, content_id:string):
        comments_raw = self.service.get_data_for_topic(content_id, True,"burgerspace")
        return comments_raw[1:len(comments_raw) + 1] if len(comments_raw) > 1 else []
