import os
from dotenv import load_dotenv

class SettingsService:
    def __init__(self):
        load_dotenv()

    def get(self,setting):
        return os.getenv(setting)