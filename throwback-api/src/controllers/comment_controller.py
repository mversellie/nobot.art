import json
from flask import Blueprint, request
from comments.comment_service import CommentService
from content.content_response import content_response_serialize
from content.content_service import ContentService
from controllers.web_helpers import blank_ok, make_keycloak_quick
from discourse.discourse_service import DiscourseService
from user.keycloak_service import KeycloakService

comment_controller = Blueprint('comment_controller',__name__)
discourse_service:DiscourseService = DiscourseService()
comment_service = CommentService(discourse_service)
content_service = ContentService()
keycloak_service:KeycloakService = make_keycloak_quick()


@comment_controller.route('/content/<username>/<title>/comments', methods=['POST','GET'])
def manage_comments(username,title):
    content_id = content_service.get_content_by_username_and_title(username, title).content_id
    if request.method == 'POST':
        jwt_token = request.headers["Authorization"].split(" ")[1]
        unlocked_token = keycloak_service.decode_jwt(jwt_token)
        comment_service.add_a_comment(content_id,request.form.get("comment"),
                                      unlocked_token["preferred_username"])
        return blank_ok()
    if request.method == 'GET':
        comments = comment_service.get_all_comments_for_thread(content_id)
        return json.dumps({"comments":comments},default=content_response_serialize)