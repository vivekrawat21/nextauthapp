'use client'
import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const  ForgetPassword = () => {
    const [loading,setLoading] = React.useState(false);
    const [ isVarified ,setIsVarified] = React.useState(false);
    const [ error,setError] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [token, setToken] = React.useState("");
    const changePassword = async() => {
        try {
            setLoading(true);
            await axios.post('api/users/forgotpassword',{token,password})
            setIsVarified(true);
            setLoading(false);
            toast.success("password changed successfully");
       } catch (error:any) {
          setError(true);
           toast.error("error while changing password.");
       }
       finally{
        setLoading(false);
       }
    }
   useEffect(()=>{
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken||"");
   },[])


   useEffect(()=>{
       if(token.length > 0){
           (changePassword);
       }
   },[token]);
    
  return (
   
      
<div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className="mb-10 text-3xl text-blue-300 font-extrabold">{loading?"processing....":"change Password"}</h1>
      <div>
                     <label className="m-4" htmlFor="email">Enter New Password</label>
                     <input type="text" className="mb-4 text-gray-800  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2" id="email"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)} />
                  </div>
                { !isVarified && <button onClick={changePassword} className='border rounded-lg p-4 border-green-300'>
                {error?"Error occured":"Change Password"}
                     </button>}
                     { isVarified && <button className='border rounded-lg p-4 border-green-300'>
                     <Link href="/login">Login.</Link>
                     </button>}
</div>
     
  )
}
export default ForgetPassword;