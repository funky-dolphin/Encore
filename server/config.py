from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_cors import CORS
from flask_session import Session

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

app = Flask(__name__)
CORS(app, supports_credentials=True)
Session(app)

app.config['SECRET_KEY']='encore'
app.config['SESSION_COOKIE_NAME'] = 'encore_cookie'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # add this line
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'  # add this line
app.json.compact = False

db = SQLAlchemy(metadata = metadata, app=app)
migrate = Migrate(app, db)









