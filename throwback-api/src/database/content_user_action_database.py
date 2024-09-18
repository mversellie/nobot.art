from datetime import datetime
from enum import Enum

from database.database_objects import ThrowbackUser,NobotContentUserAction

class ViewerActions(Enum):
    DISLIKE = -1
    LIKE = 1
    INDIFFERENT = 0

class NobotContentUserActionRepository:
    def user_view_content(self,user_id,content_id):
        now = datetime.now()
        (NobotContentUserAction.insert(content_id=content_id,viewer_id=user_id,last_viewed=now)
            .on_conflict(
                conflict_target=(NobotContentUserAction.content_id,NobotContentUserAction.viewer_id),
                preserve=[NobotContentUserAction.like_diff,NobotContentUserAction.last_like_change]
        )).execute()

    def get_content_likes(self,content_id):
        return (NobotContentUserAction.select()
         .where((NobotContentUserAction.content_id == content_id) & (NobotContentUserAction.like_diff == ViewerActions.LIKE.value) )
         .count())

    def get_content_dislikes(self,content_id):
        return (NobotContentUserAction.select()
                .where((NobotContentUserAction.content_id == content_id) & (NobotContentUserAction.like_diff == ViewerActions.DISLIKE.value) )
                .count())

    def get_content_views(self,content_id):
        return NobotContentUserAction.select().count()

    def get_user_content_action_status(self,user_id,content_id):
        content_row =  (NobotContentUserAction.select()
                .where((NobotContentUserAction.content_id == content_id) &
                       (NobotContentUserAction.viewer_id == user_id)))
        return content_row[0].like_diff

    def set_user_status(self,user_id,content_id,status):
        print(user_id + " " + content_id)
        now = datetime.now()
        query = (NobotContentUserAction.update(last_like_change=now,like_diff=status)
                 .where((NobotContentUserAction.content_id == content_id) & (NobotContentUserAction.viewer_id== user_id)))
        print(query.sql())
        query.execute()
