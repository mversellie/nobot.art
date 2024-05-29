import yaml

from database_layer import get_database
from database_objects import Changelog

if __name__ == "__main__":
    database = get_database()
    database.connect()
    if not "Changelog" in database.get_tables():
        database.create_tables([Changelog])
    database.close()
    changelog_list = open("src/db_changelog/run_order.yml")
    files_to_run:str = yaml.safe_load(changelog_list)["run"]
    for changelog_file in files_to_run:
        if not Changelog.select().where((Changelog.filename == changelog_file) & Changelog.success):
            with open("src/db_changelog/" + changelog_file) as change_file:
                exec(change_file.read())
                saved = Changelog()
                saved.filename=changelog_file
                saved.success=True
                saved.save()