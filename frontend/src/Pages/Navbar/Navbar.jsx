import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate, NavLink } from "react-router-dom";
import { auth } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/lib/auth';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


function Navbar() {
    const [loggedIn, setloggedIn] = useState(false);
    const Navigate = useNavigate()
   const {user} = useAuth();

    
    console.log(user)

    const logout=async ()=>{
        try{
            await signOut(auth)
       Navigate('/Login')
            
        }catch(error){
console.log(error)
        }
    }


    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-black shadow-lg  border-gray-800 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between loggedIn-center mx-auto max-w-screen-xl">
                    
                    <Link to="/" className="flex loggedIn-center">
                        <span className='text-white text-[1.5rem]'>Logo</span>
                    </Link>
                    <div className="flex loggedIn-center lg:order-2">
                        {user !== null ? <button onClick={logout} className='white text-white hover:bg-purple-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>LogOut</button>  :  <Link
                            to="/Login"
                            className="white text-white hover:bg-purple-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>}
                       
                        <Link
                            to="/Signup"
                            className="text-white bg-gray-400 hover:bg-purple-900 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                       <button>
                        logout
                       </button>
                       
                    </div>
                    <div
                        className="hidden justify-between loggedIn-center w-full lg:flex lg:w-auto lg:order-1 ml-20" 
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to=""
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>

                                <NavLink
                                to="/Guide"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                  Guide
                                </NavLink>
                            </li>
                            <li>

                                <NavLink
                                to="/Preference"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                  Preference
                                </NavLink>
                            </li>
                     
                            <li>
{/* 
                                <NavLink
                                to="/Signup"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                  sign up
                                </NavLink> */}
                                <NavLink
                                to="/Chat"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                  Chat
                                </NavLink>
                                <NavLink
                                to="/Voice"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b 
                                        ${isActive? "text-purple-900" : "text-gray-400"}
                                        border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-purple-900 lg:p-0`
                                    }
                                >
                                  Voice
                                </NavLink>
                            </li>
                     
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}



export default Navbar