import React from 'react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from './card'
import Recorder from './Recorder'
function VoiceComp({obtainedEmail}) {
  return (
<>
<Card className="w-[400px] h-[450px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
 <Recorder obtainedEmail={obtainedEmail}/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
</>
  )
}

export default VoiceComp