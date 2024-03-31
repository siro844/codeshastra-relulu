import React from 'react'
import { TypeEffectDemo } from './components/ui/TypeEffectDemo'
import Lottie from 'lottie-react'
import { StickyScrollDemo } from './components/ui/StickyScrollDemo'
import home1 from './home1.json'

import { LayoutGridDemo } from './components/ui/LayoutGridDemo'
// import Navbar from './Pages/Navbar/Navbar'
function Home() {

  return (
    <>

      <div className="h-[45rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">

        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <div className='relative w-[500px] bottom-[20px] right-[350px]'>

            <TypeEffectDemo />
          </div>
          <div>
            <Lottie className='w-[600px] absolute left-[200px] bottom-[50px] ' autoplay={true} animationData={home1} />
          </div>
        </p>
      </div>



      <div>


        <div className="h-[60rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center">


          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className='text-white  text-gray-300 absolute text-[4rem] top-[60px]'>A comprehensive Guide
            to all our features</div>
          <div className='w-full absolute top-[100px]'>
            <LayoutGridDemo />
          </div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          </p>
        </div>


      </div>

      {/* <div className='w-full h-[100vh] bg-black overflow-hidden' >
    

    <Lottie className='w-[600px] absolute left-[550px] bottom-[30px] ' autoplay={true} animationData={home1}/>
   
  

  </div> */}
    </>
  )
}

export default Home