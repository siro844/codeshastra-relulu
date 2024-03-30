import React from 'react'
import {auth} from '../../config/firebase'
import { googleProvider } from '../../config/firebase'
import { useState } from 'react'
function Signup() {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  return (
  <>
  <input className="border-black border-[2px]" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
  <input className="border-black border-[2px]" type="password" value={password} onChange={(e)=> setEmail(e.target.value)} />
  <button >Create account</button>
  </>
  )
}

export default Signup