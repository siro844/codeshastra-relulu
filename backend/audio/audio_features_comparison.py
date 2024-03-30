
def compare_audio_features(json_data1, json_data2, buffer_limit=0.1):
    # Load JSON data
    data1 = json_data1
    data2 = json_data2
    
    # Extract features
    pitch1 = data1['pitch']
    pitch2 = data2['pitch']
    
    spectral_centroid1 = data1['spectral_centroid']
    spectral_centroid2 = data2['spectral_centroid']
    
    mfccs1 = data1['mfccs']
    mfccs2 = data2['mfccs']
    
    # Compare features within buffer limit
    pitch_diff = abs(pitch1 - pitch2)
    spectral_centroid_diff = abs(spectral_centroid1 - spectral_centroid2)
    mfccs_diff = abs(mfccs1 - mfccs2)
    
    # Check if all differences are within the buffer limit
    if pitch_diff <= buffer_limit and spectral_centroid_diff <= buffer_limit and mfccs_diff <= buffer_limit:
        return True
    else:
        return False
