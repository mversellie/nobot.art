from flask import Blueprint, request
from content.content_service import ContentService
from controllers.web_helpers import blank_ok, make_keycloak_quick
from database.user_database import UserRepository
from user.keycloak_service import KeycloakService
from user.user_service import UserService

users_controller = Blueprint('users_controller',__name__)
keycloak_service:KeycloakService = make_keycloak_quick()
user_service:UserService = UserService(UserRepository())
content_service = ContentService()


@users_controller.route('/users', methods=['POST'])
def handleUsers():
    user_request = request.get_json()
    user_service.create_user(user_request["userId"],user_request["username"],user_request["discourseId"])
    return blank_ok()

@users_controller.route('/users', methods=['PUT'])
def update_user():
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    content_service.save_profile_pic(request.files.get("upload"),unlocked_token["preferred_username"])
    return blank_ok()
