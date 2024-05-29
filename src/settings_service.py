import yaml

def get_settings():
    settings_file = open("settings.yml")
    settings = yaml.safe_load(settings_file)
    settings_file.close()
    return settings