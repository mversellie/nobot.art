from database_layer import get_database
#from database_objects import Pal, Player, Ownership

def wipe_cache():
    db = get_database()
    db.connect()
  #  db.create_tables([Pal,Player,Ownership])
    db.close()

if __name__ == "__main__":
    wipe_cache()
