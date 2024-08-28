import json
from content.content_response import content_response_serialize
from user.keycloak_service import KeycloakSettings, KeycloakService
from settings_service import SettingsService
from flask import Response

settings:SettingsService = SettingsService()


def make_keycloak_quick():
    keycloak_settings:KeycloakSettings = KeycloakSettings(settings.get('KEYCLOAK_HOST'),
                                                          settings.get("KEYCLOAK_REALM"),
                                                          settings.get("KEYCLOAK_API_CLIENT_ID"),
                                                          settings.get("KEYCLOAK_API_CLIENT_SECRET"),
                                                          settings.get("KEYCLOAK_JWKS_URI"))
    return KeycloakService(keycloak_settings)

def handle_basic_error(code:int,error):
    response = Response("",status=code)
    return response

def good_json(body):
    out= json.dumps(body,default=content_response_serialize)
    return Response(out,status=200,mimetype='application/json')

def blank_ok():
    return Response("",status=200)