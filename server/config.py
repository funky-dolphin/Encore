from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv 
import os

load_dotenv()
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
# app.secret_key = os.environ.get('APP_SECRET_KEY')
CORS(app)
# Session(app)

app.config['SESSION_COOKIE_NAME'] = 'encore_cookie'
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # add this line
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SESSION_TYPE'] = 'filesystem'  # add this line
app.json.compact = False

db = SQLAlchemy(metadata = metadata, app=app)
migrate = Migrate(app, db)









 