import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardHeader,Card,
    CardContent,
    CardDescription,
    CardFooter, 
    CardTitle, } from "@/components/ui/card"

export function PreferenceForm() {

    const Navigate=useNavigate()
   const preferenceRef= collection(db, "preference")


const submitDoc=async ()=>{
    try{
        console.log("hi submit")
        await addDoc(preferenceRef, {
            branch: branch,
            github: github,
            gmail: gmail,
            name: name,
            tokens: secretTokens})
            console.log("hi")
            Navigate('/Chat')
    }catch(error){
console.log(error)
    }
}


    const [name, setName]=useState("")
    const [gmail,setGmail]=useState("")
    const [secretTokens, setSecretTokens]=useState("")
    const [github, setGitub]=useState('')
    const [branch, setBranch]=useState("")
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
              <Label htmlFor="gmail">Gmail</Label>
              <Input id="Gmail" placeholder="Gmail" value={gmail} onChange={(e)=> setGmail(e.target.value)}/>
              <Label htmlFor="secretTokens">Secret Tokens</Label>
              <Input id="secretTokens" placeholder="SecretTokens" value={secretTokens} onChange={(e)=> setSecretTokens(e.target.value)} />
              <Label htmlFor="github">Github</Label>
              <Input id="github" placeholder="github tokens" value={github} onChange={(e)=> setGitub(e.target.value)} />
              <Label htmlFor="branch">branch</Label>
              <Input id="branch" placeholder="branch" value={branch} onChange={(e)=> setBranch(e.target.value)} />
             
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
           
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button  onClick={submitDoc} className="relative left-[110px]">submit</Button>
      </CardFooter>
    </Card>
  )
}
