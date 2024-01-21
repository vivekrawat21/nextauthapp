import mongoose from "mongoose";

export async function connect (){
    try {
    mongoose.connect(process.env.MONGO_URI!);  //we use ! in the uri because in typescript there is no guarantee this uri is always resolved by puttint the ! we ensure the typsript that this uri will always be resolved....

    //Once mongoose is connected then connection will be given 
    const connection = mongoose.connection;
    //when connection is succefully established then it will give some events and we can listen to events using on  we can also listen to the errors 
      connection.on('connnected',()=>{
        console.log("MongoDB is connected successfully");

        connection.on('error',(err)=>{
            console.log("MongoDb connection error. Please make sure MongoDB is running "+err);
            process.exit();
        })
      });
    } catch (error) {
       console.log(error); 
    }
    
}