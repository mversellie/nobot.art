import json

from flask import Flask, request
from content.content_service import ContentService, FileToSave
from keycloak_jwt_service import KeycloakJWTService
import jwt

from werkzeug.utils import secure_filename

from exceptions.custom_exceptions import ContentNotFoundException

app = Flask(__name__)
content_service = ContentService()
jwt_service = KeycloakJWTService()

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

@app.errorhandler(jwt.exceptions.InvalidTokenError)
def bad_token(error):
    return handle_basic_error(403,error)

@app.route('/content/<username>/<title>', methods=['GET'])
def get_content_by_username_and_title(username,title):
    body=content_service.get_content_by_creator_and_name(username,title)
    return good_json(body)

@app.route('/content', methods=['POST'])
def receive_new_content():
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = jwt_service.decode_jwt(jwt_token)
    file_to_save = request.form.to_dict()
    file_to_save["file_data"] = request.files.get("upload")
    file_to_save["creator"] = unlocked_token["preferred_username"]
    file_to_save["filename"] = secure_filename(request.files["upload"].filename)
    content_service.save_content(FileToSave.dict_con(file_to_save))
    return blank_ok()


def handle_basic_error(code:int,error):
    print(error)
    response = app.response_class(status=code)
    return response

def good_json(body):
    response = app.response_class(
        response= json.dumps(body.__dict__),
        status=200,
        mimetype='application/json'
    )
    return response

def blank_ok():
    response = app.response_class(status=200)
    return response

if __name__ == "__main__":
    app.run()
