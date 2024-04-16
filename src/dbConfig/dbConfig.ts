import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection =mongoose.connection
        connection.on('connected',(err)=>{
            console.log('mongodb connection error,please make sure db is up and ruunning :' + err);
        process.exit()
        })
    } catch (error) {
        console.log('Something went wrong in connectiong to DB ');
        console.log(error);
        
    }
}