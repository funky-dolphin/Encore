from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt, db, app

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)

    artist = db.relationship("Artist", back_populates = "user")
    serialize_rules = ('-artist.user', )


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf8'))
        self._password_hash = password_hash.decode('utf8')

    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf8'))
        

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    band_name = db.Column(db.String)

    user = db.relationship("User", back_populates='artist')
    events = db.relationship("Event", back_populates='artist')

    serialize_rules = ('-events.artist', '-user.artist')
  

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    venue = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    city = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    price = db.Column(db.String)
    link = db.Column(db.String)

    artist = db.relationship("Artist", back_populates = "events")

    serialize_rules = ('-artist.events', )


class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String, nullable=False)








