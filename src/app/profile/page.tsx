'use client'
import React from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    
    const [loading, setLoading] = React.useState(false)
    const[data,setData]:any = React.useState("nothing");
    const [name ,setName]:any = React.useState("");
    const router = useRouter();
    const onLogout = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/logout")

            setLoading(false);
           console.log(response.data.message); 
            toast.success(response.data.message)
            router.push("/login")
           

        }
        catch (err:any) {
           console.log(err.message);
         toast.error(err.message);
        }
        finally {
            setLoading(false);
        }


    }
    const getUserDetails = async () => {
       const response =  await axios.get("/api/users/me");
       console.log(response.data);
       toast.success(response.data.message);
        setData(response.data.data._id);
        setName(response.data.data.username);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-cyan-400 text-2xl font-extrabold">UserProfile</h1>
            <hr />
            <p className="text-xl font-serif text-purple-100">Profile page:  {data ==='nothing'?"click on button to get details":<Link href={`/profile/${data}`}><span className="underline text-blue-500 font-mono text-lg">{name}</span></Link>}</p>
            <hr />

            <button className="p-5 my-6 border   rounded-lg border-red-300 hover:bg-gray-900" onClick={onLogout} >
                {loading ? "logging out..." : "Logout"}
            </button>
            <button className="p-5 my-6 border   rounded-lg border-green-200 hover:bg-gray-900" onClick={getUserDetails}>
             GetName
            </button>
        </div>
    )

}