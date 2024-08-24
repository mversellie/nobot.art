import json

from comments.comment_service import CommentService
from content.content_response import content_response_serialize
from flask import Flask, request
from content.content_service import ContentService, FileToSave
import jwt

from database.user_database import UserRepository
from discourse.discourse_service import DiscourseService
from settings_service import SettingsService
from user.keycloak_service import KeycloakSettings, KeycloakService


from werkzeug.utils import secure_filename

from exceptions.custom_exceptions import ContentNotFoundException, DiscourseException, KeycloakRestException
from user.user_service import UserService

app = Flask(__name__)
content_service = ContentService()
settings:SettingsService = SettingsService()
keycloak_settings:KeycloakSettings = KeycloakSettings(settings.get('KEYCLOAK_HOST'),
                                             settings.get("KEYCLOAK_REALM"),
                                             settings.get("KEYCLOAK_API_CLIENT_ID"),
                                             settings.get("KEYCLOAK_API_CLIENT_SECRET"),
                                             settings.get("KEYCLOAK_JWKS_URI"))
keycloak_service:KeycloakService = KeycloakService(keycloak_settings)
comment_service:CommentService = CommentService(DiscourseService())
user_service:UserService = UserService(UserRepository())


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.errorhandler(404)
def not_found_error(error):
    return handle_basic_error(404,error)

@app.errorhandler(ContentNotFoundException)
def content_not_found(error):
    return handle_basic_error(404,error)

@app.errorhandler(DiscourseException)
def discourse_issue(error):
    print(error)
    return handle_basic_error(error.error_code,error.message)

@app.errorhandler(KeycloakRestException)
def keycloak_issue(error):
    print(error)
    return handle_basic_error(error.error_code,error.message)

@app.errorhandler(jwt.exceptions.InvalidTokenError)
def bad_token(error):
    return handle_basic_error(403,error)

@app.route('/content', methods=['POST','GET'])
def base_content():
    if request.method == 'POST':
        jwt_token = request.headers["Authorization"].split(" ")[1]
        unlocked_token = keycloak_service.decode_jwt(jwt_token)
        file_to_save = request.form.to_dict()
        file_to_save["file_data"] = request.files.get("upload")
        file_to_save["creator"] = unlocked_token["preferred_username"]
        file_to_save["creator_id"] = unlocked_token["sub"]
        file_to_save["filename"] = secure_filename(request.files["upload"].filename)
        body = content_service.save_content(FileToSave.dict_con(file_to_save))
        return good_json(body)
    if request.method == 'GET':
        page_no = request.args.get('page')
        page_size = request.args.get('page_size')
        if page_no is None: page_no = 1
        if page_size is None:page_size = 20
        body=content_service.get_latest(page_no,page_size)
        added_body={"content":body}
        return good_json(added_body)

@app.route('/content/<username>', methods=['GET'])
def get_gallery_page(username):
    page_no = request.args.get('page')
    page_size = request.args.get('page_size')
    if page_no is None: page_no = 1
    if page_size is None:page_size = 20
    body=content_service.get_gallery_page_for_user(username,page_no,page_size)
    added_body= {"content":body}
    return good_json(added_body)

@app.route('/content/<username>/<title>', methods=['GET'])
def get_content_by_username_and_title(username,title):
    body=content_service.get_content_by_username_and_title(username, title)
    return good_json(body)

@app.route('/content/<username>/<title>/comments', methods=['POST','GET'])
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
        return good_json({"comments":comments})


@app.route('/users', methods=['POST'])
def handleUsers():
    user_request = request.get_json()
    user_service.create_user(user_request["userId"],user_request["username"],user_request["discourseId"])
    return blank_ok()

@app.route('/users', methods=['PUT'])
def update_user():
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = keycloak_service.decode_jwt(jwt_token)
    content_service.save_profile_pic(request.files.get("upload"),unlocked_token["preferred_username"])
    return blank_ok()


def handle_basic_error(code:int,error):
    print(error)
    response = app.response_class(status=code)
    return response

def good_json(body):
    out=json.dumps(body,default=content_response_serialize)
    response = app.response_class(
        response= out,
        status=200,
        mimetype='application/json'
    )
    return response

def blank_ok():
    response = app.response_class(status=200)
    return response

def start(port):
    if port is None:
        port = 5000
    app.run(port=port)

if __name__ == "__main__":
    start()


