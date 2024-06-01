import string

import requests
from requests.auth import HTTPBasicAuth
import json

from user_service import UserService


class KeycloakSettings:
    def __init__(self, host, realm,id,secret):
        self.host = host
        self.realm= realm
        self.client_id= id
        self.client_secret= secret


class KeycloakService(UserService):

    def __init__(self,settings:KeycloakSettings):
        self.settings=settings
        self.token = self.get_keycloak_token()['access_token']

    def get_keycloak_token(self):
        url = self.settings.host + "/realms/" + self.settings.realm + "/protocol/openid-connect/token"
        headers = {'Content-Type' : 'application/x-www-form-urlencoded'}
        auth = HTTPBasicAuth(self.settings.client_id, self.settings.client_secret)
        response = requests.request("POST",url,headers=headers,data = 'grant_type=client_credentials',
                                    auth=auth)
        print(response.json())
        return response.json()

    def make_keycloak_user(self,username:string,email:string,passcode:string):
        url = self.settings.host +  "/admin/realms/" + self.settings.realm + "/users"
        headers = {'Content-Type' : 'application/json', "Authorization": "Bearer " + self.token}
        user_data = {
            "email" : email,
            "firstName" : "",
            "lastName": "",
            "emailVerified": False,
            "enabled": True,
            "username":username,
            "credentials" : [
                {
                    "type": "password",
                    "temporary": False,
                    "value": passcode
                }
            ]
        }
        response = requests.post(url,headers = headers,data=json.dumps(user_data))
        return response.ok

    def get_keycloak_user(self,username:string):
        url = self.settings.host +  "/admin/realms/" + self.settings.realm + "/users"
        headers = {'Content-Type' : 'application/json', "Authorization": "Bearer " + self.token}
        user_data = {
            "username":username
        }
        response = requests.get(url,headers = headers,params=user_data)
        user_arr_object = response.json()
        return user_arr_object[0]

    def get_generic_user(self, username:string):
        return self.get_keycloak_user(username)

    def create_generic_user(self,username:string,email:string,password:string):
        return self.make_keycloak_user(username,email,password)
