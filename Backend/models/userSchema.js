import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
        maxLength:[20,"phone number must be exact 11 digits"]
    },
    cnic:{
        type:String,
        required:true,
        minLength:[13,"Your CNIC must contain exact 13 digits"],
        maxLength:[13,"Your CNIC must contain exact 13 digits"]
    },
    dob:{
        type:Date,
        required:[true,"dob is must required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"], 
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Your password must be at least 13 characters!"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    doctorAvatar:{
        public_id:String,
        url:String
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
     this.password =await bcrypt.hash(this.password , 10)
    // try {
    //     const salt = await bcrypt.genSalt(10);
    //     this.password = await bcrypt.hash(this.password, salt);
    //     next();
    // } catch (error) {
    //     return next(error);
    // }
});


userSchema.methods.comparePassword = async function (enteredPassowrd){
    return await bcrypt.compare(enteredPassowrd,this.password)
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRES
    })
}

export const User = mongoose.model("User",userSchema);
