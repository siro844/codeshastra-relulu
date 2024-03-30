import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase app
cred = credentials.Certificate('account_key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()