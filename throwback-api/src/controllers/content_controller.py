from flask import Blueprint, request
from content.content_service import ContentService, FileToSave
from content.content_user_meta_service import ContentUserMetaService
from controllers.web_helpers import good_json, make_keycloak_quick, handle_basic_error
from database.content_user_action_database import NobotContentUserActionRepository
from user.keycloak_service import KeycloakService
from werkzeug.utils import secure_filename

content_controller = Blueprint('content_controller',__name__)
content_service = ContentService()
keycloak_service:KeycloakService = make_keycloak_quick()
content_user_meta_service =  ContentUserMetaService(NobotContentUserActionRepository())


@content_controller.route('/content', methods=['POST','GET'])
def base_content():
    if request.method == 'POST':
        unlocked_token = keycloak_service.extract_user_data(request)
        file_to_save = request.form.to_dict()
        file_to_save["file_data"] = request.files.get("upload")
        file_to_save["creator"] = unlocked_token.preferred_username
        file_to_save["creator_id"] = unlocked_token.user_id
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
    user_data = keycloak_service.extract_user_data(request)
    content_user_meta_service.view_content(user_data.user_id,body.content_id)
    user_meta_data = content_user_meta_service.get_user_meta_stats(user_data.user_id,body.content_id)
    body.userMeta = user_meta_data
    return good_json(body)

@content_controller.route('/content/<username>/<title>/act', methods=['POST'])
def like_or_unlike_content(username,title):
    user_data = keycloak_service.extract_user_data(request)
    if not user_data.is_authed:
        handle_basic_error(403,"You must be registered to act")
    action = request.json.get('action')
    like_actions=["like","unlike"]
    if action in like_actions:
        print("acting in like")
        body=content_service.get_content_by_username_and_title(username, title)
        user_data = keycloak_service.extract_user_data(request)
        content_user_meta_service.view_content(user_data.user_id,body.content_id)
        is_liked = action == "like"
        if is_liked:
            content_user_meta_service.like_content(user_data.user_id,body.content_id)
            print("like worked")
        else:
            content_user_meta_service.neutralize_content(user_data.user_id,body.content_id)
            print("dislike worked")
        return good_json({"isLiked":is_liked})
    handle_basic_error(400,"action wrong")
