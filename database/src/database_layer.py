import re

from peewee import *

from settings_service import get_settings

def get_database():
    settings_data = get_settings()
    if re.search("SQLite",settings_data["database"]["type"]):
        return SqliteDatabase(settings_data["database"]["url"])
    return False
