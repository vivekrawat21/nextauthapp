"use client";
//by doing this we can use all the hooks and front-end things
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import axios from "axios";

const LoginPage = ()=> {
  const router = useRouter();
    const [user , setUser] = React.useState({
        email:"",
        password :"",
    });
    const [loading , setLoading] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);


    
  
    const onLogin = async () => {
    try {
      setLoading(true);
     const response = await axios.post("/api/users/login",user);
     console.log("login successful",response.data);
     toast.success("login successful");
     router.push(`/profile/${response.data.data}`);
    } catch (error:any) {
      console.log("Login fialed", error.message);
      toast.error(error.message);
    } finally{
      setLoading(false);
    }

    } ;

    React.useEffect(()=>{

      if(user.email.length > 0 && user.password.length>0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }

    },[user])

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-10 text-3xl text-blue-300 font-extrabold">{loading?"processing....":"Login"}</h1>
        <div>
        <label className="m-4" htmlFor="email">Enter email</label>
        <input type="email" className="mb-4 text-gray-800  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 p-2" id="email"
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
        onClick={onLogin}
        className="p-5 my-6 border   rounded-lg border-red-300 hover:bg-gray-900">
        {buttonDisabled ? "Not login" : "Login"}
        </button>
        <button>
          <Link href = "/signup">visit SignUp</Link>
        </button>
        </div>
  )
}

export default LoginPage