import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain 3 Characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name Must Contain 3 Characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"enter the valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"phone number must be exact 11 digits"],
        maxLength:[11,"phone number must be exact 11 digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Must Contain At Least 10 Characters!"]
    }
})

export const Message = mongoose.model("Message",messageSchema)