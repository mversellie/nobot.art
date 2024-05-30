import datetime
import json
import string

from content_response import ContentResponse


def get_content_by_id(id:string):
    return json.dumps(content_mock().__dict__,indent=4, sort_keys=True, default=str)

def content_mock():
    base_url = "http://localhost:5000"
    return ContentResponse("aTitle","aCreator",base_url + "/assets/img/vue2.png",base_url + "/assets/img/thumb-vue2.png",
                           datetime.datetime(2024, 12, 17),"desc","vue2")

