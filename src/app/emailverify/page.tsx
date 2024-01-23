'use client'
import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const  ForgetPassword = () => {
    const [loading,setLoading] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");
    const [ isVarified ,setIsVarified] = React.useState(false);
    const verifyemail = async() => {
        try {
            setLoading(true);
            await axios.post('api/users/verifyuser',{userEmail})
            setLoading(false);
            setIsVarified(true);
            toast.success("Verified successfully");
            
       } catch (error:any) {
           console.log(error.response.data);
           toast.error(error.response.data.message);
       }
       finally{
        setLoading(false);
       }
   }
    
  return (
   
      
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="mb-10 text-3xl text-blue-300 font-extrabold">{loading?"processing....":"Varification Page"}</h1>
   <div>
                  <label className="m-4" htmlFor="email">Enter email</label>
                  <input type="text" className="mb-4 text-gray-800  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2" id="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)} />

              </div>
           {!isVarified && <button onClick={verifyemail} className='border rounded-lg p-4 border-green-300'>
                      verify
                  </button>
        }
        {isVarified &&
        <span className='text-xl font-mono font-bold text-green-300'>Check email to change password</span>

        }
      
</div>
     
  )
}
export default ForgetPassword;