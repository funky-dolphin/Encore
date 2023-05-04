from flask import request, make_response, jsonify, session
from flask_restful import Resource, Api
from models import db, User
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
        new_user = User(
                username = data['username'],
                password_hash = data['_password_hash'],
                email = data['email'],
                city = data['city'],
                address = data['address']
            )
        try:
            db.session.add(new_user)
            db.session.commit()
            
            response = make_response(new_user.to_dict(), 200)
            return response
        except:
            return {"message":"User not created"}


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

if __name__ == '__main__':
    app.run(port=5555, debug=True)   