class ContentNotFoundException(Exception):
    def __init__(self,message):
        self.message = message

class UserNotFoundException(Exception):
    def __init__(self,message):
        self.message = message

class DiscourseException(Exception):
    def __init__(self,error_code,errors,url):
        self.message = errors
        self.error_code = error_code
        self.errors = errors
        self.url = url

class KeycloakRestException(Exception):
    def __init__(self,error_code,errors,url):
        self.message = errors
        self.error_code = error_code
        self.errors = errors
        self.url = url


