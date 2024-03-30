from flask import Flask, jsonify, request 
from flask_cors import CORS
from authentication.audio.audio_features_processing import extract_audio_features
from authentication.audio.audio_features_comparison import compare_audio_features
from authentication.database.firebase_db import db
import subprocess
import os
import agents.super_agent as super_agent
import agents.gmail_agent as gmail_agent
import agents.github_agent as github_agent
import agents.calendar_events as calendar_events
import agents.script_executing_agent as script_executing_agent
import agents.realtime_agent as realtime_agent
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
    type = super_agent.super_agent_function(text)
    if type == "Gmail":
        output = gmail_agent.send_mail(text)
    elif type == "Github":
        output = github_agent.github_action(text)
    elif type == "Calendar Events":
        output = calendar_events.get_events(text)
    else:
        output = realtime_agent.realtime_agent_function(text)
    print(output)
    return jsonify({
        'output': output
    })
    
        


@app.route('/list_folders', methods=['POST'])
def list_folders():
    data = request.json
    directory = data.get('directory')

    if directory:
        # Execute the appropriate command based on the operating system
        if os.name == 'nt':  # Check if the operating system is Windows
            command = 'dir /ad /b "{}"'.format(directory)
        else:  # Assume Unix-like system
            command = 'ls -l "{}" | grep "^d" | awk "{{print $NF}}"'.format(directory)

        try:
            # Execute the command and capture the output
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            output = result.stdout.strip()
            error = result.stderr.strip()
            
            if output:
                folders = output.split('\n')
                return jsonify({'folders': folders})
            elif error:
                return jsonify({'error': error}), 500
            else:
                return jsonify({'folders': []})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Directory not specified in the request.'}), 400

if __name__ == '__main__':
    app.run(debug=True)




