
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

function Signup() {
  return (
<div className="w-full flex h-[90vh] items-center justify-center">
<div className="w-full lg:grid lg:min-h-[400px]  xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto grid w-[400px] gap-6 p-12">
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
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
         
        </Card>
      </div>
   
    </div>
  
</div>
  )
}

export default Signup
