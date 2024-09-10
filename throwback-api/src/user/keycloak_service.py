
import string
import jwt
import urllib3
import json
from dotenv import load_dotenv

from exceptions.custom_exceptions import KeycloakRestException

load_dotenv()

class KeycloakSettings:
    def __init__(self, host, realm,id,secret,jwks_url):
        self.host = host
        self.realm= realm
        self.client_id= id
        self.client_secret= secret
        self.jwks_url=jwks_url

class KeycloakService:
    def __init__(self,settings:KeycloakSettings):
        self.http =urllib3.PoolManager()
        self.client_id= settings.client_id
        self.client_secret= settings.client_secret
        self.realm= settings.realm
        self.host= settings.host
        self.token = self.get_keycloak_token()
        self.jwks_url = settings.jwks_url
        self.jwks_client = jwt.PyJWKClient(self.jwks_url)

    def is_successful(self,res):
        return 200 <= res < 300


    def get_keycloak_token(self):
        url = self.host + "/realms/" + self.realm + "/protocol/openid-connect/token"
        auth_string = self.client_id + ":" + self.client_secret
        headers = urllib3.make_headers(basic_auth=auth_string)
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        response = self.http.request("POST",url,headers=headers, body='grant_type=client_credentials')
        if not self.is_successful(response.status):
            raise KeycloakRestException(response.status,response.data,url)
        return response.data

    def update_keycloak_profile_pic(self,profile_pic_url:string,user_id:string):
        url = self.host +  "/realms/" + self.realm + "/users/" + user_id
        headers = {'Content-Type' : 'application/json', "Authorization": "Bearer " + self.token}
        user_data = { "UserRepresentation" :
                          {"attributes": {"profile_pic_url":[profile_pic_url]}}
        }
        response = self.http.request("PUT", url,headers = headers,body=json.dumps(user_data))
        if not self.is_successful(response.status):
            raise KeycloakRestException(response.status,response.data,url)

    def decode_jwt(self,token):
        header = jwt.get_unverified_header(token)
        kid = header["kid"]
        key = self.jwks_client.get_signing_key(kid).key
        return jwt.decode(token,key,algorithms=["RS256"],options={"verify_aud":False})