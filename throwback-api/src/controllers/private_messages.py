from controllers.web_helpers import good_json, make_keycloak_quick, blank_ok
from discourse.discourse_service import DiscourseService
from private_message.private_message_service import PrivateMessageService
from user.keycloak_service import KeycloakService
from flask import Blueprint, request

private_messages_controller = Blueprint('private_messages_controller',__name__)
discourse_service:DiscourseService = DiscourseService()
private_message_service = PrivateMessageService(discourse_service)
keycloak_service:KeycloakService = make_keycloak_quick()


@private_messages_controller.route('/private-messages', methods=['GET'])
def get_private_messages_for_user():
    if request.method == 'GET':
        jwt_token = request.headers["Authorization"].split(" ")[1]
        unlocked_token = keycloak_service.decode_jwt(jwt_token)
        private_messages = private_message_service.get_private_messages(unlocked_token["preferred_username"])
        print(private_messages)
        added_body={"privateMessages":private_messages}
        return good_json(added_body)

@private_messages_controller.route('/private-messages/<pm_id>', methods=['GET'])
def get_a_private_message(pm_id):
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    if request.method == "POST":
        content = request.json["content"]
        private_message_service.reply_to_private_message(unlocked_token["preferred_username"],pm_id,content)
    private_messages = private_message_service.get_private_message(unlocked_token["preferred_username"],pm_id)
    added_body={"replies":private_messages}
    return good_json(added_body)

@private_messages_controller.route('/private-messages/<pm_id>', methods=['POST'])
def reply_to_a_private_message(pm_id):
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    content = request.json["content"]
    private_message_service.reply_to_private_message(unlocked_token["preferred_username"],pm_id,content)
    return blank_ok()


@private_messages_controller.route('/private-messages/<pm_id>', methods=['DELETE'])
def delete_a_private_message(pm_id):
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    private_message_service.delete_a_private_message(unlocked_token["preferred_username"],pm_id)
    return blank_ok()
