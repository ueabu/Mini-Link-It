# Mini-Link-It
A URL Shortener Application build with React JS, Python Flask, Firebase Data Base and Heroku.

## Project Videos
1. React Client App: https://youtu.be/LGdIDm-4Dv8
2. Flask Server and Heroku Deployment: https://youtu.be/OX4IBcoKVfg

The project is composed of two folders, mini-link-it-client and mini-link-it-server

## mini-link-it-client
This is single page react app written with bootstrap that takes the long URL from a user, stores it in a database (firebase database) and gives the user a generated
mini url.

### Dependencies
1. Firebase Project Account
2. Firebase Database in Project Account

### Environment Variables
The client requires environment variables to connect to Firebase. You need to create the following files:

#### `.env.local` (for local development)
Create this file in the `mini-link-it-client` folder with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### `.env.production` (for production builds)
Create this file in the `mini-link-it-client` folder with your production Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

To get these values:
1. Go to your Firebase Console (https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (Project Settings)
4. Scroll down to "Your apps" section
5. Select your web app or create one if you haven't
6. Copy the config values into your `.env.local` and `.env.production` files

### Running client Locally
1. `npm install` To install dependencies
2. Create `.env.local` file with your Firebase configuration (see Environment Variables section above)
3. `npm start`

### Building for Production
1. Create `.env.production` file with your production Firebase configuration
2. Run `npm run build:production`

## mini-link-it-server
This is a python flask web server that listens for calls made with the generated URL, goes to the database, fetches the long URL then redirects the user to the
long URLS page.

### Dependencies
1. Firebase Project Account
2. Firebase Database in Project Account
3. Python 3.x

### Environment Variables
The server requires environment variables to connect to Firebase. You need to create the following file:

#### `.env`
Create this file in the `mini-link-it-server` folder with your Firebase Database URL:
```
DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
```

To get your Firebase Database URL:
1. Go to your Firebase Console (https://console.firebase.google.com/)
2. Select your project
3. Click on "Realtime Database" in the left sidebar
4. Copy the database URL shown at the top (it should look like `https://your-project-id-default-rtdb.firebaseio.com/`)
5. Paste it into your `.env` file

### Service Account Key
You also need a Firebase service account JSON key file:

1. Go to your Firebase Console
2. Click on the gear icon (Project Settings)
3. Go to the "Service Accounts" tab
4. Click "Generate New Private Key"
5. Save the downloaded JSON file as `ServiceAccountKey.json` in the `mini-link-it-server` folder

### Running Server Locally
1. Create a virtual environment in the mini-link-it-server folder: `python3 -m venv venv`
2. Activate virtual environment:
   - Mac/Linux: `source venv/bin/activate`
   - Windows: `venv/Scripts/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Create `.env` file with your Firebase Database URL (see Environment Variables section above)
5. Place `ServiceAccountKey.json` in the mini-link-it-server folder
6. Run the server: `python wsgi.py`

## Deployment

The Flask app is set up to serve the production build of the React application. The React build needs to be located in the `mini-link-it-server/app/build` folder for this to work.

### Automated Build and Deploy Process

A deployment script (`deploy.sh`) is provided in the root folder that automates the entire build and deployment process. This script:

1. Builds the React client using the production environment variables
2. Removes any old build from the server folder
3. Copies the new build to `mini-link-it-server/app/build`
4. Provides next steps for deployment

To use the deployment script:
```bash
./deploy.sh
```

### Manual Build Process

If you prefer to build manually:

1. Navigate to the client folder: `cd mini-link-it-client`
2. Build the React app: `npm run build:production`
3. Copy the build folder to the server: `cp -r build ../mini-link-it-server/app/`

### Deploying to Fly.io

Once the build is ready in the server folder, deploy to Fly.io:

1. Make sure you have the Fly.io CLI installed:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Login to Fly.io:
   ```bash
   flyctl auth login
   ```

3. Set up environment variables (first time only):
   ```bash
   cd mini-link-it-server
   flyctl secrets set DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
   ```

4. Deploy the application:
   ```bash
   cd mini-link-it-server
   flyctl deploy
   ```

5. Open your deployed app:
   ```bash
   flyctl open
   ```

### Important Notes

- The `ServiceAccountKey.json` file should be included in your deployment (it's used by the server to authenticate with Firebase)
- Make sure all environment variables are set in Fly.io secrets before deploying
- The `fly.toml` configuration file in the `mini-link-it-server` folder contains the deployment settings

Happy coding!
