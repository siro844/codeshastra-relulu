import React from 'react'
import { LayoutGridDemo } from '@/components/ui/LayoutGridDemo'
function Guide() {
  return (
    <>
    <div className="h-[60rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">
  
   
{/* Radial gradient for the container to give a faded look */}
<div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
<div className='text-white  text-gray-300 absolute text-[4rem] top-[60px]'>A comprehensive Guide 
to all our features</div>
<div className='w-full absolute top-[100px]'>
<LayoutGridDemo/>
</div>
<p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
</p>
</div>

  
    </>

  )
}

export default Guide