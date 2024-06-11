from src.settings_service import get_settings
import jwt


class KeycloakJWTService:

    def __init__(self):
        self.settings = get_settings("../settings.yml")
        self.jwks_url = self.settings["keycloak"]["jwks_uri"]
        self.jwks_client = jwt.PyJWKClient(self.jwks_url)
        print(self.jwks_client.__dict__)
        print(self.jwks_client.get_jwk_set().keys.pop().key)
        self.signing_key = self.jwks_client.get_jwk_set().keys.pop().key


    def decode_jwt(self,token):
        return jwt.decode(token,key = self.signing_key,algorithms=["RS256"],audience="throwback-spa")
