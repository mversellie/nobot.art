import string

import yaml

def get_settings(settings_file_path:string):
    settings_file = open(settings_file_path)
    settings = yaml.safe_load(settings_file)
    settings_file.close()
    return settings