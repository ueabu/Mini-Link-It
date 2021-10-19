from flask import Flask, redirect
import firebase_admin
from firebase_admin import db

cred_obj = firebase_admin.credentials.Certificate('./ServiceAccountKey.json')
default_app = firebase_admin.initialize_app(cred_obj,  {
	'databaseURL': ''
	})

app = Flask(__name__)

@app.route("/")
def hello_world():
    return redirect('https://www.example.com')

@app.route("/<path:generatedKey>", methods=['GET'])
def fetch_from_firebase(generatedKey):
    ref = db.reference("/"+ generatedKey)
    data = ref.get()

    if not data:
        return '404 not found'
    else:
        longURL = data['longURL']
        return  redirect(longURL)

