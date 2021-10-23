# Mini-Link-It
A URL Shortener Application build with React JS, Python Flask, Firebase Data Base and Heroku.

Project Video:
React Client App: 
Flask Server and Heroku Deployment:

The project is composed of two folders, mini-link-it-client and mini-link-it-server

## mini-link-it-client
This is single page react app written with bootstrap that takes the long URL from a user, stores it in a database (firebase database) and gives the user a generated
mini url. 

### Dependencies
1. Firebase Project Account
2. Firebase Database in Project Account
3. Firebase config in index.js line 9. See this video on how to generate your own config.

### Running Locally
### `npm install` To install dependencies (Be sure you have a firebase account)
### `npm start`

## mini-link-it-server
This is a python flask web server that listens for calls made with the generated URL, goes to the database, fetches the long URL then redirects the user to the
long URLS page.

### Dependencies
1. Firebase Project Account
2. Firebase Database in Project Account
3. Firebase service account json key file (ServiceAccountKey.json) in mini-link-it-server/app/main.py line 6 (See video on how to generate yours)
4. Firebase Database URL in mini-link-it-server/app/main.py line 8 (See video on how to generate yours)

### Running Server Locally
1. Create a virtual environment in the mini-link-it-server folder (python3 -m venv venv)
2. Activate virtual environment (`source venv/bin/activate` for mac and `venv/Scripts/activate` for windows)
3. Besure you have the ServiceAccountKey.json in mini-link-it-server. 
4. `python wsgi.py`

The flask app is also set up to run the production version the react app. The build should be locatedin the app folder for this to work!

Happy coding!
