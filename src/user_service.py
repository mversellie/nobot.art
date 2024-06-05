from keycloak_service import KeycloakService
from settings_service import get_settings
from user_auth_interface import UserPlatformConnectionInterface


class UserService:

    keycloakService:UserPlatformConnectionInterface

    def __init__(self, settings_filename):
        self.settings = get_settings("settings.yml")
        self.keycloakService:UserPlatformConnectionInterface = KeycloakService(self.settings['keycloak'])


    def create_user(self,username,password,email):
        self.keycloakService.create_generic_user(username,password,email)
