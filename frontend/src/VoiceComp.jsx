import { useAuth } from '@/lib/auth'
import React from 'react'
import Lottie from 'lottie-react'
import voiceSvg from './voiceSvg.json'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from './components/ui/card'
import Recorder from './components/ui/Recorder'

function VoiceComp({obtainedEmail}) {
const {user} = useAuth();
const Navigate=useNavigate()

// const submitAudio=async ()=>{
//     const formdata = new FormData();
//     formdata.append('audio_file', audioControl)
//     formdata.append('username', user.email)

//     try{
//         const response = await fetch('http://127.0.0.1:5000/extract-audio-features',{
//             method: 'POST',
//             body: formdata
//         });

//     }
//     catch(error){
//         console.log(error)
//     }
// }

const submitAudio=()=>{
 Navigate('/Preference')
}

    const [audioControl,setAudioControl]=useState()

  return (
<>
<Card className="w-[400px] h-[450px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Lottie className='w-[300px] relative bottom-[50px] left-[20px]' animationData={voiceSvg}/>
        <div className='relative bottom-[130px] left-[20px]'>
 <Recorder  setAudioControl={setAudioControl} obtainedEmail={obtainedEmail}/>
 </div>
      </CardContent>
     {audioControl &&  <CardFooter className="flex justify-between">
        
        <Button  className="relative bottom-[130px] left-[110px]" onClick={submitAudio}>Submit Audio</Button>
      </CardFooter>}
    </Card>
</>
  )
}

export default VoiceComp