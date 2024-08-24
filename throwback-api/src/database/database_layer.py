from peewee import *

from settings_service import SettingsService

def get_database():
    settings_data = SettingsService()
    host = settings_data.get("DATABASE_HOST")
    port = settings_data.get("DATABASE_PORT")
    database = settings_data.get("DATABASE_NAME")
    username = settings_data.get("DATABASE_USERNAME")
    password = settings_data.get("DATABASE_PASSWORD")
    return PostgresqlDatabase(database,user=username,password=password,host=host,port=port)