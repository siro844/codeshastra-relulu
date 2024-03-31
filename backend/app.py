from flask import Flask, jsonify, request 
from flask_cors import CORS
from authentication.audio.audio_features_processing import extract_audio_features
from authentication.audio.audio_features_comparison import compare_audio_features
from authentication.database.firebase_db import db
import agents.super_agent as super_agent
import agents.gmail_agent as gmail_agent
import github_agent as github_agent
import agents.calendar_events as calendar_events
import agents.script_executing_agent as script_executing_agent
import agents.next_recommendation as next_recommendation
import agents.realtime_agent as realtime_agent
import agents.only_trans as trans_agent
import agents.integrated_terminal as integrated_terminal
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
    # print(saved_features)
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
    type = super_agent.super_agent_function(text)
    output=''
    if type == "Gmail":
        output = gmail_agent.send_mail(text)
    elif type == "Github" or "github" in text:
        output = github_agent.github_action(text)
    elif type == "Calendar Events":
        output = "Calendar Event Created Successfully"
        output = calendar_events.get_events(text)
    elif type == "Terminal":
        output = integrated_terminal.execute(text)
    else:
        output = realtime_agent.realtime_agent_function(text)
    # print(output)
    return jsonify({
        'output': output
    })
    
@app.route('/recommend', methods=["POST"])
def recommend():
    json = request.get_json()
    text = json.get('text')
    output = next_recommendation.get_next_recommendation(text)
    return jsonify({
        'output': output
    })


if __name__ == '__main__':
    app.run(debug=True)




