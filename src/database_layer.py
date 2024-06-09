import re

from peewee import *

from settings_service import get_settings

def get_database():
    settings_data = get_settings("../settings.yml")
    if re.search("sqlite",settings_data["database"]["type"].lower()):
        return SqliteDatabase(settings_data["database"]["url"])
    return False
