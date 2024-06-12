import json

from flask import Flask, request
from content_service import ContentService, FileToSave
from keycloak_jwt_service import KeycloakJWTService
import jwt

from werkzeug.utils import secure_filename

from custom_exceptions import ContentNotFoundException

app = Flask(__name__)
content_service = ContentService()
jwt_service = KeycloakJWTService()

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
def getContentById(username,title):
    body=content_service.get_content_by_creator_and_name(username,title)
    return good_json(body)

@app.route('/content', methods=['POST'])
def receive_new_content():
    jwt_token = request.headers["Authorization"].split(" ")[1]
    unlocked_token = jwt_service.decode_jwt(jwt_token)
    file_to_save:FileToSave = request.form.to_dict()
    file_to_save.file_data = request.files["upload"]
    file_to_save["username"] = unlocked_token["preferred_username"]
    file_to_save["filename"] = secure_filename(request.files["upload"].filename)
    content_service.save_content(file_to_save)
    return blank_ok()

def handle_basic_error(code:int,error):
    print(error)
    response = app.response_class(status=code)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def good_json(body):
    response = app.response_class(
        response= json.dumps(body),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def blank_ok():
    response = app.response_class(status=code)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run()
