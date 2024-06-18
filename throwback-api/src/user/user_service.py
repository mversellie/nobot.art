import string

from user.user_database import ThrowbackUser


class CreateUserRequest:
    throwbackId: string
    username: string
    providerId: string
    providerPlatformId = 1
    email: string

class UserService:

    def create_user_from_keycloak(self,request:CreateUserRequest):
        ThrowbackUser.create(provider_id =  request.providerId,throwback_id = request.throwbackId,
                             email = request.email,username = request.username,provider_platform_id = 1)
