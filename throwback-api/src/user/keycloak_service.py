
import string
import jwt
import requests
import json
from dotenv import load_dotenv

from exceptions.custom_exceptions import KeycloakRestException

load_dotenv()

class KeycloakUserData:
    def __init__(self,username,user_id,is_authed):
        self.preferred_username=username
        self.user_id=user_id
        self.is_authed=is_authed

class KeycloakSettings:
    def __init__(self, host, realm,id,secret,jwks_url):
        self.host = host
        self.realm= realm
        self.client_id= id
        self.client_secret= secret
        self.jwks_url=jwks_url

class KeycloakService:
    def __init__(self,settings:KeycloakSettings):
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
        headers = {'Content-Type':'application/x-www-form-urlencoded'}
        response = requests.post(url,headers=headers, data='grant_type=client_credentials',auth=(self.client_id,self.client_secret))
        if not self.is_successful(response.status_code):
            raise KeycloakRestException(response.status_code,response.json(),url)
        return response.json()

    def update_keycloak_profile_pic(self,profile_pic_url:string,user_id:string):
        url = self.host +  "/realms/" + self.realm + "/users/" + user_id
        headers = {'Content-Type' : 'application/json', "Authorization": "Bearer " + self.token}
        user_data = { "UserRepresentation" :
                          {"attributes": {"profile_pic_url":[profile_pic_url]}}
        }
        response = self.http.request("PUT", url,headers = headers,body=json.dumps(user_data))
        if not self.is_successful(response.status_code):
            raise KeycloakRestException(response.status_code,response.json(),url)

    def decode_jwt(self,token):
        header = jwt.get_unverified_header(token)
        kid = header["kid"]
        key = self.jwks_client.get_signing_key(kid).key
        return jwt.decode(token,key,algorithms=["RS256"],options={"verify_aud":False})

    def extract_user_data(self,request):
        #use IP address for temporary user_id for view or tracking
        try:
            jwt_token = request.headers["Authorization"].split(" ")[1]
            unlocked_token = self.decode_jwt(jwt_token)
            return KeycloakUserData(unlocked_token["preferred_username"],unlocked_token["sub"],True)
        except KeyError:
            if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
                temp_id= request.environ['REMOTE_ADDR']
            else:
                temp_id= request.environ['HTTP_X_FORWARDED_FOR']
            return KeycloakUserData(temp_id,temp_id,False)