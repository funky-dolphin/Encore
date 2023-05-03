from app import app
from models import db, Genre

with app.app_context():

    Genre.query.delete()

    alternative  = Genre(genre = "alternative")
    blues = Genre(genre = "blues")
    classical = Genre(genre = "classical")
    country = Genre(genre = "country")
    dance_electronic = Genre(genre = "dance/electronic")
    folk = Genre(genre = "folk")
    hip_hop = Genre(genre = "hip-hop")
    jazz = Genre(genre = "jazz")
    latin = Genre(genre = "latin") 
    metal = Genre(genre = "metal")
    pop = Genre(genre = "pop")
    RB_soul = Genre(genre = "r&b_soul")
    reggae = Genre(genre = "reggae")
    rock = Genre(genre = "rock")
    world = Genre(genre = "world")

    genres = [alternative, blues, classical, country, dance_electronic, folk, hip_hop, jazz, latin, metal, pop, RB_soul, reggae, rock, world]
    db.session.add_all(genres)
    db.session.commit()






