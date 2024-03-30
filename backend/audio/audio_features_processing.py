import librosa
import numpy as np 
def extract_audio_features(audio_file):
    # Load audio file
    y, sr = librosa.load(audio_file)

    # Extract pitch using YIN algorithm
    pitch= float(np.mean(librosa.yin(y, fmin=50, fmax=2000)))

    # Extract tone (spectral centroid)
    spectral_centroid = float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)))

    # Extract accent (MFCCs)
    mfccs = float(np.mean(librosa.feature.mfcc(y=y, sr=sr)))

    print('Pitch:', pitch, 'Spectral Centroid:', spectral_centroid, 'MFCCs:', mfccs)
    return pitch, spectral_centroid, mfccs

