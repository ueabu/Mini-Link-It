from flask import Flask, redirect
import firebase_admin
from firebase_admin import db
import os

cred_obj = firebase_admin.credentials.Certificate('./ServiceAccountKey.json')
default_app = firebase_admin.initialize_app(cred_obj,  {
	'databaseURL': 'https://mini-link-it-default-rtdb.firebaseio.com/'
	})

# app = Flask(__name__)
app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route("/")
def hello_world():
    return app.send_static_file('index.html')

    # return redirect('https://www.example.com')

@app.route("/<path:generatedKey>", methods=['GET'])
def fetch_from_firebase(generatedKey):
    ref = db.reference("/"+ generatedKey)
    data = ref.get()

    if not data:
        return '404 not found'
    else:
        longURL = data['longURL']
        return  redirect(longURL)
