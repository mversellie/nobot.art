import string

from settings_service import get_settings
from database_objects import ThrowbackUser
from user_auth_interface import UserPlatformConnectionInterface

class CreateUserRequest:
    throwbackId: string
    username: string
    providerId: string
    providerPlatformId = 1
    email: string

class UserService:

    keycloakService:UserPlatformConnectionInterface

    def __init__(self):
        self.settings = get_settings("../settings.yml")
#        self.keycloakService:UserPlatformConnectionInterface = KeycloakService(self.settings['keycloak'])


    def create_user(self,username,password,email):
        self.keycloakService.create_generic_user(username,password,email)

    def create_user_from_keycloak(self,request:CreateUserRequest):
        ThrowbackUser.create(provider_id =  request["providerId"],throwback_id = request["throwbackId"],
                             email = request["email"],username = request["username"],provider_platform_id = 1)