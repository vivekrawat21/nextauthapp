"use client";
//by doing this we can use all the hooks and front-end things
import { useRouter } from "next/navigation";
import { Axios } from "axios";
import React from "react";
import Link from "next/link";

const SignUpPage = ()=> {
    const [user , setUser] = React.useState({
        email:"",
        password:"",
        username : "",
    });
    const onSignUp = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-10 text-3xl text-blue-300 font-extrabold">SignUp</h1>
        <div>
        <label className="m-4" htmlFor="username">Enter username</label>
        <input type="text" className="mb-4 text-gray-800  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2" id="username"
        value={user.username}
        onChange={(e)=>setUser({...user , username: e.target.value})}/>
        
        </div>
        <div>
        <label className="m-4" htmlFor="email">Enter Email</label>
        <input type="email" className="mb-4 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2"
        id="email"
        value={user.email}
        onChange={(e)=>setUser({...user , email: e.target.value})}/>
        
        </div>
        <div>
        <label className="m-4" htmlFor="password">Enter password</label>
        <input type="password" className="mb-4 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2"
        id="password"
        value={user.password}
        onChange={(e)=>setUser({...user , password: e.target.value})}/>
         
        </div>
        <button 
        onClick={onSignUp}
        className="p-5 my-6 border   rounded-lg border-red-300 hover:bg-gray-900">
          SignUp
        </button>
        <button>
          <Link href = "/login">visit login</Link>
        </button>
        </div>
  )
}

export default SignUpPage