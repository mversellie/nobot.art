import jwt
from flask import Flask

from controllers.comment_controller import comment_controller
from controllers.content_controller import content_controller
from controllers.private_messages import private_messages_controller
from controllers.users_controller import users_controller
from controllers.web_helpers import handle_basic_error
from exceptions.custom_exceptions import DiscourseException, ContentNotFoundException, KeycloakRestException

app = Flask(__name__)
app.register_blueprint(content_controller)
app.register_blueprint(comment_controller)
app.register_blueprint(users_controller)
app.register_blueprint(private_messages_controller)


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
    return handle_basic_error(error.error_code,error.message)

@app.errorhandler(KeycloakRestException)
def keycloak_issue(error):
    print(error)
    return handle_basic_error(error.error_code,error.message)

@app.errorhandler(jwt.exceptions.InvalidTokenError)
def bad_token(error):
    return handle_basic_error(403,error)

def start(port):
    if port is None:
        port = 5000
    app.run(port=port)

if __name__ == "__main__":
    start(5000)
