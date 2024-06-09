from flask import Flask, request
import content_service
from user_service import CreateUserRequest, UserService

app = Flask(__name__)


def __init__(self):
    pass


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
