import jwt
from settings_service import SettingsService


class KeycloakJWTService:

    def __init__(self):
        self.settings = SettingsService()
        self.jwks_url = self.settings.get("KEYCLOAK_JWKS_URI")
        self.client_id = self.settings.get("KEYCLOAK_CLIENT-ID")
        self.jwks_client = jwt.PyJWKClient(self.jwks_url)
        self.signing_key = self.jwks_client.get_jwk_set().keys.pop().key

    def decode_jwt(self,token):
        return jwt.decode(token,key = self.signing_key,algorithms=["RS256"],audience=self.client_id)
