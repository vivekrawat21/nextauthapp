"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage(){

    const [token,setToken] = useState("");
    const[verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async()=>{
        try {
             await axios.post('api/users/verifyemail',{token})
             setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    useEffect(()=>{
     const urlToken = window.location.search.split("=")[1];
     setToken(urlToken||"");
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl ">
                Verify Email
            </h1>
            <h2 className="p-2  text-cyan-300 font-serif font-extrabold ">
                {token?`${token}`:"no token"}
            </h2>
            {verified && (
                <div>
                    <h2 className="text-2xl font-mono font-bold text-green-400">
                       email varified
                    </h2>
                    <Link href="/login" className="text-blue-500 border font-bold border-blue-300 py-3 rounded-lg">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl font-bold font-mono text-red-400">
                       Error
                    </h2>
                    {/* <Link href="/signup" className="text-blue-500">
                        Login
                    </Link> */}
                </div>
            )}
        </div>
    )
}