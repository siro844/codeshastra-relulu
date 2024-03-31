import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Recorder = ({obtainedEmail}) => {
  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    
    document.getElementById('newdiv').appendChild(audio)
  };



  return (
    <div>
        <div className='relative '>
      <AudioRecorder 
      
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      </div>
      <div id='newdiv'>

      </div>
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
    </div>
  )
}

export default Recorder