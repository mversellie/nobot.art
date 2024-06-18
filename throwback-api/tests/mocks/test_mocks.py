import json

from content.content_service import FileToSave


def get_throwback_content_mock():
    with open("tests/mocks/throwback_content_mock.json","r") as mock_file:
        file_contents = mock_file.read()
    return json.loads(file_contents)

def get_mock_img_file():
    return open("tests/mocks/mock.png","rb")

def get_mock_upload_content_request():
    with open("tests/mocks/throwback_content_save_request_no_file.json","r") as mock_file:
        file_contents = mock_file.read()
    ret = FileToSave.dict_con(json.loads(file_contents))
    ret.file_data = get_mock_img_file()
    return ret

