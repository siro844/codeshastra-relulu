from flask import Flask, jsonify, request 
from flask_cors import CORS
from authentication.audio.audio_features_processing import extract_audio_features
from authentication.audio.audio_features_comparison import compare_audio_features
from authentication.database.firebase_db import db


app = Flask(__name__)
CORS(app)  


@app.route('/extract-audio-features', methods=['POST'])
def extract():
    audio_file = request.files['audio_file']
    username = request.form['username']
    music_genre = request.form['genre']
    music_artist = request.form['artist']
    news_type = request.form['news']
    yt_content = request.form['content']


    pitch, spectral_centroid, mfccs = extract_audio_features(audio_file)
    data = {
        'username': username,
        'pitch': pitch,
        'spectral_centroid': spectral_centroid,
        'mfccs': mfccs,
        'music_genre': music_genre,
        'music_artist': music_artist,
        'news_type': news_type,
        'yt_content': yt_content
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

@app.route('/generate', methods=["POST"])
def analyze():
    text = request.get_json()['text']
    # output = 
    # return jsonify({'result': processed_text})

if __name__ == '__main__':
    app.run(debug=True)




