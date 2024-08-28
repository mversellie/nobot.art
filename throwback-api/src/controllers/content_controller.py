from flask import Blueprint, request
from content.content_service import ContentService, FileToSave
from controllers.web_helpers import good_json, make_keycloak_quick
from discourse.discourse_service import DiscourseService
from user.keycloak_service import KeycloakService
from werkzeug.utils import secure_filename

content_controller = Blueprint('content_controller',__name__)
discourse_service:DiscourseService = DiscourseService
content_service = ContentService()
keycloak_service:KeycloakService = make_keycloak_quick()


@content_controller.route('/content', methods=['POST','GET'])
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

@content_controller.route('/content/<username>', methods=['GET'])
def get_gallery_page(username):
    page_no = request.args.get('page')
    page_size = request.args.get('page_size')
    if page_no is None: page_no = 1
    if page_size is None:page_size = 20
    body=content_service.get_gallery_page_for_user(username,page_no,page_size)
    added_body= {"content":body}
    return good_json(added_body)

@content_controller.route('/content/<username>/<title>', methods=['GET'])
def get_content_by_username_and_title(username,title):
    body=content_service.get_content_by_username_and_title(username, title)
    return good_json(body)