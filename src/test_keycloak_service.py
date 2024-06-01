import random
import string
import unittest

import keycloak_service
from user_service import UserService


class TestKeycloakService(unittest.TestCase):
    def test_create_user_works(self):
        username = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
        email = username + "@garbage.test"
        settings = keycloak_service.KeycloakSettings("http://192.168.50.229:44929",
                                                     "throwback-art","throwback-user-manager-client",
                                                     "K33yHnY5bYrMKjHSdcxcyZpPa3snmtB1")
        service:UserService = keycloak_service.KeycloakService(settings)
        create_user_response = service.create_generic_user( username, email,"12345pass")
        self.assertTrue(create_user_response,msg = "User creation response success")
        user = service.get_generic_user(username)
        self.assertIn("id",user,msg = "Authentication Failure")


if __name__ == '__main__':
    unittest.main()
