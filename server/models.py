from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db 
from flask_hashing import Hashing

hashing = Hashing()

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
        if not password:
            raise ValueError("Password must be entered")
        password_hash = hashing.hash_value(password)
        self._password_hash = password_hash

    def authenticate(self, password):
        encoded_password = password.encode('utf-8')
        return hashing.check_value(self._password_hash, encoded_password)    

    @validates("username")
    def validates_username(self, key, value):
        if not value:
            raise ValueError("Must include Username")
        return value 

    @validates("email")
    def validates_email(self, key, value):
        if not value:
            raise ValueError('Must include Email')
        return value

    @validates("city")
    def validates_city(self, key, value):
        if not value:
            raise ValueError('Must include city')
        return value

    @validates("address")
    def validates_address(self, key, value):
        if not value:
            raise ValueError("Must include address")
        return value    

    @validates("state") 
    def validates_state(self, key, value):
        if len(value) > 2:
            raise ValueError("Must be a state code of two letters")
        elif not value:
            raise ValueError("Must include State")
        return value

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

    @validates('venue')
    def validate_venue(self,key, value):
        if not value:
            raise ValueError('Venue must be provided')
        return value
        
    @validates('time')
    def validate_time(self, key, value):
        if not value:
            raise ValueError('Time must be provided')
        return value
        
    @validates('date')
    def validate_data(self, key, value):
        if not value:
            raise ValueError('Date must be provided')
        return value
    
    @validates('city')
    def validates_city(self, key, value):
        if not value:
            raise ValueError('City must be provided')
        return value
    
    @validates('address')
    def validates_address(self, key, value):
        if not value:
            raise ValueError('Address must be provided')
        return value
    
    @validates('genre')
    def validates_genre(self, key, value):
        if not value:
            raise ValueError('Genre must be provided')
        return value
    
    @validates('price')
    def validates_price(self, key, value):
        if not value:
            raise ValueError("Price must be provided")
        return value
     



class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String, nullable=False)








