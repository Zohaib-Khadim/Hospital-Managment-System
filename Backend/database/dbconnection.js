import mongoose from "mongoose";
export const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"MERN_STACK_HOSPITAL_MANAGMENT_SYSTEM"
    }).then(()=>{
        console.log("connected to database!");
    }).catch((err)=>{
        console.log(`error occure during connection to database:${err}`);
    })
}
