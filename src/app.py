from flask import Flask, request
from content_service import ContentService, FileToSave
from user_service import CreateUserRequest, UserService
import jwt
from werkzeug import secure_filename

app = Flask(__name__)
jwt_public_file = open("../jwt.public", "r")
jwt_public = jwt_public_file.read()
jwt_public_file.close()
content_service = ContentService()


@app.errorhandler(404)
def not_found_error(error):
    print("404")
    return app.send_static_file("index.html")

@app.route('/content/<content_id>', methods=['GET'])
def getContentById(content_id):
    response = app.response_class(
        response=content_service.get_content_by_id(content_id),
        status=200,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/content', methods=['POST'])
def receive_new_content():
    try:
        jwt_token = request.headers["Authorization"].split(" ")[1]
        unlocked_token = jwt.decode(jwt_token, jwt_public, algorithm="RS256")
        content_name = request.form().get("name")
        description = request.form.get("description")
        file = request.files["upload"]
        username = unlocked_token["preferred_username"]
        file_to_save = content_service.FileToSave(name = content_name, file_data = file, creator = username,
                                                  description = description, filename = secure_filename(file.filename))
        content_service.save_content(file_to_save)
        response = app.response_class(
            status=200
        )
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except jwt.exceptions.InvalidTokenError:
        response = app.response_class(
            status=403
        )
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/users', methods=['POST'])
def handleUsers():
    user_request:CreateUserRequest = request.get_json()
    print(user_request)
    user_service: UserService = UserService()
    user_service.create_user_from_keycloak(user_request)
    response = app.response_class(status=200)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()
