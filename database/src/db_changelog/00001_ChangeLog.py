from database_layer import get_database
#from database_objects import Example

if __name__ == "__main__":
    db = get_database()
    db.connect()
    #db.create_tables([Example])
    db.close()
