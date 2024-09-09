import string

from flask import Blueprint, request
from content.content_service import ContentService
from controllers.private_messages import private_message_service
from controllers.web_helpers import blank_ok, make_keycloak_quick, handle_basic_error
from database.user_database import UserRepository
from discourse.discourse_service import DiscourseService
from settings_service import SettingsService
from user.keycloak_service import KeycloakService
from user.user_service import UserService

users_controller = Blueprint('users_controller',__name__)
keycloak_service:KeycloakService = make_keycloak_quick()
discourse_service:DiscourseService = DiscourseService()
user_service:UserService = UserService(UserRepository(),discourse_service)
content_service = ContentService()
settings_service = SettingsService()


@users_controller.route('/users', methods=['POST'])
def createUser():
    print("inside create user")
    user_request = request.get_json()
    auth_token = request.headers["Authorization"].split(" ")[1]
    if auth_token != settings_service.get("KEYCLOAK_TO_NOBOT_API_ACCESS_TOKEN"):
        return handle_basic_error(403,"keycloak authorization token set wrong in listener")

    user_service.create_user(user_request["userId"],user_request["username"],user_request["email"])
    #delete_new_user_private_messages(username)
    return blank_ok()

@users_controller.route('/users', methods=['PUT'])
def update_user():
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    content_service.save_profile_pic(request.files.get("upload"),unlocked_token["preferred_username"])
    return blank_ok()

def delete_new_user_private_messages(username:string):
    pms = private_message_service.get_private_messages(username)
    for message in pms:
        private_message_service.delete_a_private_message(username,message["id"])
