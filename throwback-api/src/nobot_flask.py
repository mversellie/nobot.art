import jwt
from flask import Flask
from flask_cors import CORS

from controllers.comment_controller import comment_controller
from controllers.content_controller import content_controller
from controllers.private_messages import private_messages_controller
from controllers.users_controller import users_controller
from controllers.web_helpers import handle_basic_error
from exceptions.custom_exceptions import DiscourseException, ContentNotFoundException, KeycloakRestException

app = Flask(__name__)
CORS(app)
app.register_blueprint(content_controller)
app.register_blueprint(comment_controller)
app.register_blueprint(users_controller)
app.register_blueprint(private_messages_controller)

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
        port = 80
    app.run(port=port,host="0.0.0.0",debug=True)

if __name__ == "__main__":
    start(80)
