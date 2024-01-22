'use client'
import React from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile({ params }: any) {
    const [loading, setLoading] = React.useState(false)
    const router = useRouter();
    const onLogout = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/logout")

            setLoading(false);

            console.log(response.data.message);
            router.push("/login")
        }
        catch (err) {

        }
        finally {
            setLoading(false);
        }


    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>UserProfile</h1>
            <hr />
            <p className="text-4xl">Profile page{params.id}</p>
            <hr />

            <button className="p-5 my-6 border   rounded-lg border-red-300 hover:bg-gray-900" onClick={onLogout} >
                {loading ? "logging out..." : "Logout"}
            </button>
        </div>
    )

}