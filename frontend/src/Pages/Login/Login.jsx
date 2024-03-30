
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

function Login() {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [ren, setRen] = useState(false)


  const HandleClick = () => {

    // setLoggedIn((prev)=> !prev)
    if (loggedIn) {

      setRen(false)
      
      Navigate('/Signup')
    }
    else {
      setRen(true)
    }
  }


  useEffect(() => {
    console.log("hi")
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);
  return (
    <div className="w-full flex h-[80vh]  items-center justify-center">
      <div className="w-full lg:grid h-[80vh]">
        <div className="flex items-center h-[80vh] justify-center py-12">



          <div className="h-[46rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">


            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {/* <div className='text-white  text-gray-300 absolute text-[4rem] top-[60px]'>A comprehensive Guide 
  to all our features</div> */}
            <div className='w-full absolute top-[120px]'>
              <Card className="mx-auto grid w-[400px] gap-6 p-12">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <button onClick={(e) => HandleClick(e)}>
                    Sign up
                  </button>
                </div>
                {
                  ren ? <div className="text-red-400 text-center">Couldnt Login</div> : <div></div>
                }

              </Card>
            </div>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            </p>
          </div>



        </div>

      </div>

    </div>
  )
}

export default Login
