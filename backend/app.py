from flask import Flask, jsonify, request 
from flask_cors import CORS
from audio.audio_features_processing import extract_audio_features
from audio.audio_features_comparison import compare_audio_features
from database.firebase_db import db

app = Flask(__name__)
CORS(app)  


@app.route('/extract-audio-features', methods=['POST'])
def extract():
    audio_file = request.files['audio_file']
    username = request.form['username']
    pitch, spectral_centroid, mfccs = extract_audio_features(audio_file)
    data = {
        'username': username,
        'pitch': pitch,
        'spectral_centroid': spectral_centroid,
        'mfccs': mfccs
    }
    user_ref =  db.collection('users')
    user_ref.add(data)
    return jsonify(data)

@app.route('/verify-user', methods=['POST'])
def verify_user():
    audio_file = request.files['audio_file']
    username = request.form['username']

    user_ref = db.collection('users')
    query = user_ref.where('username', '==', username).get()
    retrieved_data = []

    for doc in query:
        # Add document data to the list
        retrieved_data.append(doc.to_dict())

    saved_features = retrieved_data[0]
    print(saved_features)
    pitch, spectral_centroid, mfccs = extract_audio_features(audio_file)
    current_features = {
        'username': username,
        'pitch': pitch,
        'spectral_centroid': spectral_centroid,
        'mfccs': mfccs
    }
    result = compare_audio_features(saved_features, current_features)
    return jsonify({
        'result': result
    })

if __name__ == '__main__':
    app.run(debug=True)



