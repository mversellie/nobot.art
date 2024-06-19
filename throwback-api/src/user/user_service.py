import string
import uuid

from user.user_database import ThrowbackUser


class CreateUserRequest:

    def __init__(self):
        self.throwbackId: string = ""
        self.username: string = ""
        self.providerId: string = ""
        self.email: string = ""
        self.providerPlatformId = 1

    def from_dict(dict_in):
        ret = CreateUserRequest()
        ret.username = dict_in["username"]
        ret.email = dict_in["email"]
        ret.providerId = dict_in["providerId"]
        return ret


def create_user_from_keycloak(request_in):
    request = CreateUserRequest.from_dict(request_in)
    ThrowbackUser.create(provider_id =  request.providerId,throwback_id = request.providerId,
                             email = request.email,username = request.username,provider_platform_id = 1)
