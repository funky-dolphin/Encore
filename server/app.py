from flask import request, make_response, jsonify, session
from flask_restful import Resource, Api
from models import db, User, Event, Artist
from config import app, bcrypt

api = Api(app)

class Signup(Resource):
    # def get(self):
    #     user = User.query.filter(User.id == session.get('user_id')).first()
    #     if user:
    #         return user.to_dict()
    #     else:
    #         return {'message': '401: Not Authorized'}, 401
    def post(self):
        data = request.get_json()
        is_artist = data.get('is_artist')
        new_user = User(
                username = data['username'],
                password_hash = data['_password_hash'],
                email = data['email'],
                city = data['city'],
                address = data['address'],
                state = data['state'],
            )
        try:
            db.session.add(new_user)
            db.session.flush()  # Flush to get the user's id before committing the transaction

            if is_artist:
                artist = Artist(band_name=data['band_name'], user_id=new_user.id)
                db.session.add(artist)

            db.session.commit()

            response = make_response(new_user.to_dict(), 200)
            return response
        except:
            return {"message": "User not created"}

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        data = request.get_json()
        # print("Received data:", data)
        username = data['username']
        user = User.query.filter(User.username == username).first()
        
        password = data['password']

        if not user:
            return {'error': 'Invalid username or password'}, 401

        if user.authenticate(password):
            session['user_id'] = user.id
            print(session.get('user_id')," is the session data")
            return user.to_dict(), 200
        

api.add_resource(Login, '/login')

class CheckSession(Resource):

    def get(self):
        print(session.get('user_id'),"this is the session data")
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# # AUTHORIZED
class Logout(Resource):
    def post(self):
        session.clear()
        return {'message': 'Logout successful.'}, 200

api.add_resource(Logout, '/logout')


class Events(Resource):
    def get(self):
        events = Event.query.all()
        events_dict = [event.to_dict() for event in events]
        return make_response(events_dict, 200)
    
    def post(self):
        user_id = session.get('user_id')
        artist = Artist.query.filter(Artist.user_id == user_id).first()

        if not artist:
            return make_response({'message':'Artist not found'}, 404)
        
        data = request.get_json()
        new_event = Event(
            artist = artist, 
            venue = data['venue'], 
            time = data['time'], 
            date= data['date'], 
            image = data['image'], 
            city= data['city'],
            address = data['address'],
            genre = data['genre'],
            price = data['price'], 
            link = data['link'],
            )
        db.session.add(new_event)
        db.session.commit()
        
        return make_response(new_event.to_dict(), 200)
    
api.add_resource(Events, '/concerts')

class Events_by_id(Resource):
    def get(self, id):
        event = Event.query.filter_by(id = id).first()
        if not event:
            return make_response({'message': "No Event"})
        return make_response(event.to_dict(), 200)
    
    def patch(self, id):
        if not session['user.artist_id']:
            return {'message': 'must be an artist'}
        event = Event.query.filter_by(id = id).first()
        data = request.get_json()
        for attr in data:
            setattr(event, attr, data[attr])
        db.session.add(event)
        db.session.commit()
        return make_response(event.to_dict(), 200)
    
    def delete(self, id):
        if not session['user.artist_id']:
            return {'message': 'must be an artist'}
        
        event = Event.query.filter_by(id = id).first()
        if not event:
            return make_response({'message': "No Event"})
        db.session.delete(event)
        db.session.commit()
        return make_response({'message':'event deleted successfully'})
    
api.add_resource(Events_by_id, '/amateur_events/<int:id>')





if __name__ == '__main__':
    app.run(port=5555, debug=True)   