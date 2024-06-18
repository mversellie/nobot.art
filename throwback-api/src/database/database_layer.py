import re

from peewee import *

from settings_service import SettingsService

def get_database():
    settings_data = SettingsService()
    if re.search("sqlite",settings_data.get("DATABASE_TYPE").lower()):
        return SqliteDatabase(settings_data.get("DATABASE_URL"))
    return False