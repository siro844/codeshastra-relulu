
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { googleProvider } from "@/config/firebase"
import { auth } from "@/config/firebase"
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth"
import { async } from "@firebase/util"
import Recorder from "@/components/ui/Recorder"
import VoiceComp from "@/components/ui/VoiceComp"

function Signup() {

const [email, setEmail]=useState("")
const [password, setPassword]=useState("")

const [control,setControl]=useState(true)

const [obtainedEmail, setObtainedEmail]= useState("")


const signupfun= async () =>{
  try{
    const data=await createUserWithEmailAndPassword(auth,email,password)
    setObtainedEmail(data._tokenResponse.email)
    setObtainedEmail(false)
  }
  catch(error){
    console.log(error)
  }
}

const signInWithGoogle=async ()=>{
  try{
    await signInWithPopup(auth,googleProvider)
  }
  catch(error){
    console.log(error)
  }
}


  return (
<>
    <div className="w-full flex h-[90vh] items-center justify-center">
      <div className="w-full lg:grid">
        <div className="flex items-center justify-center py-12">



          <div className="h-[46rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">


            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {/* <div className='text-white  text-gray-300 absolute text-[4rem] top-[60px]'>A comprehensive Guide 
              to all our features</div> */}
            <div className='w-full absolute top-[100px]'>
              {control ?  <Card className="mx-auto grid w-[400px] gap-6 p-12">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Sign Up</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email to create an account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" value={password}
                    onChange={(e)=> setPassword(e.target.value)} type="password" required />
                  </div>
                  <Button type="submit" onClick={signupfun} className="w-full">
                    Create account
                  </Button>
                  <Button variant="outline" onClick={signInWithGoogle} className="w-full">
                    Create account with google
                  </Button>
                </div>

              </Card>: <VoiceComp obtainedEmail={obtainedEmail}/>} 
             
            </div>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            </p>
          </div>


        </div>

      </div>
    
    </div>
{/* <VoiceComp obtainedEmail={obtainedEmail}/> */}
    </>

  )
}

export default Signup
