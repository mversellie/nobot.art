from database.content_user_action_database import NobotContentUserActionRepository, ViewerActions
from content.content_response import ContentUserMetaData

class ContentUserMetaService:
    def __init__(self,repository:NobotContentUserActionRepository):
        self.repository = repository

    def get_user_meta_stats(self,user_id,content_id):
        like_count = self.repository.get_content_likes(content_id)
        dislike_count = self.repository.get_content_dislikes(content_id)
        view_count = self.repository.get_content_views(content_id)
        viewer_status = self.repository.get_user_content_action_status(user_id,content_id)
        return ContentUserMetaData(like_count,dislike_count,view_count,viewer_status)

    def like_content(self,viewer_id,content_id):
        self.repository.set_user_status(viewer_id,content_id,ViewerActions.LIKE.value)

    def dislike_content(self,viewer_id,content_id):
        self.repository.set_user_status(viewer_id,content_id,ViewerActions.DISLIKE.value)

    def neutralize_content(self,viewer_id,content_id):
        self.repository.set_user_status(viewer_id,content_id,ViewerActions.INDIFFERENT.value)

    def view_content(self,viewer_id,content_id):
        self.repository.user_view_content(viewer_id,content_id)
