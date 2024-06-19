import jwt
from settings_service import SettingsService


class KeycloakJWTService:

    def __init__(self):
        self.settings = SettingsService()
        self.jwks_url = self.settings.get("KEYCLOAK_JWKS_URI")
        self.jwks_client = jwt.PyJWKClient(self.jwks_url)

    def decode_jwt(self,token):
        header = jwt.get_unverified_header(token)
        kid = header["kid"]
        key = self.jwks_client.get_signing_key(kid).key
        return jwt.decode(token,key,algorithms=["RS256"],options={"verify_aud":False})
