'use client'
export default function UserProfile({params} : any){
    return (
   <div className="flex flex-col items-center justify-center min-h-screen">
   <h1>UserProfile</h1>
   <hr />
   <p className="text-4xl">Profile page{params.id}</p>
   </div>
    )
}