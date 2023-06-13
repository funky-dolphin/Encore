from flask import request, make_response, jsonify, session, render_template
from flask_restful import Resource, Api
from models import db, User, Event, Artist
from config import app
import os


import traceback
# from flask_session import Session

api = Api(app)
app.secret_key = "nickisthebest"

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


class Signup(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401
    def post(self):
        try:
            data = request.get_json()
            is_artist = data.get('is_artist')
            new_user = User(
                    username = data['username'],
                    password_hash = data['password'],
                    email = data['email'],
                    city = data['city'],
                    address = data['address'],
                    state = data['state'],
                )
            print(f"Type of password: {type(data['password'])}")
            print(f"Value of password: {data['password']}")
            db.session.add(new_user)
            db.session.flush()  # Flush to get the user's id before committing the transaction

            if is_artist:
                artist = Artist(band_name=data['band_name'], user_id=new_user.id)
                db.session.add(artist)

            db.session.commit()

            response = make_response(new_user.to_dict(), 200)
            return response
        
        except Exception as e:
            print(traceback.format_exc())
            return make_response({"error":e.__str__()}, 422)

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

        # if not artist:
        #     return make_response({'message':'Artist not found'}, 404)
        
        try:
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
        except Exception as e:
            return make_response({"error":e.__str__()}, 422)
    
api.add_resource(Events, '/concerts')

class Events_by_id(Resource):
    def get(self, id):
        event = Event.query.filter_by(id = id).first()
        if not event:
            return make_response({'message': "No Event"})
        return make_response(event.to_dict(), 200)
    

    def patch(self, id):
        user_id = session.get("user_id")
        user = User.query.filter_by(id=user_id).first()
        event = Event.query.filter_by(id = id).first()

        if event.artist.id == user.artist[0].id:
            data = request.get_json()

            for attr in data:
                setattr(event, attr, data[attr])

            db.session.add(event)
            db.session.commit()

            return make_response(event.to_dict(), 200)
        return make_response({'message':'Not your event'}, 404)
    
    def delete(self, id):
        user_id = session.get("user_id")
        user = User.query.filter_by(id=user_id).first()
        event = Event.query.filter_by(id = id).first()
  

        if event.artist.id == user.artist[0].id:
            db.session.delete(event)
            db.session.commit()
            return make_response({'message': 'Event deleted successfully'}, 200)
        return make_response({'message': 'Not your event'}, 404)

    
api.add_resource(Events_by_id, '/amateur_events/<int:id>')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 2000)))