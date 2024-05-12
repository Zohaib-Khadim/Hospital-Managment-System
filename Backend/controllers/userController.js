import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from '../utils/jwtToken.js';


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        gender,
        dob,
        cnic,
        phone
    } = req.body;

    if (!firstName || !lastName || !email || !password || !role || !gender || !dob || !cnic || !phone) {
        return next(new ErrorHandler("Fill the Full Form", 400));
    }
    let user = await User.findOne({email});
    if (user) {
        return next("User Aleady Registered")
    }
    user = User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        gender,
        dob,
        cnic,
        phone
    });
    // res.status(200).json({success: true, message: "User Registration is Successfull!"})
     generateToken(user , "User Registered is Successfull!" , 200 , res)
})


export const login = catchAsyncErrors(async (req, res, next) => {
    const {email, password, confirmPassword, role} = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Detlails", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Please give same password in the confirmPassword", 400));

    }
    let user = await User.findOne({email}).select("+password");
    if (! user) {
        return next(new ErrorHandler("Invalid password or email ", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (! isPasswordMatched) {
        return next(new ErrorHandler("Invalid password ", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role is not found!", 400))

    }
    // res.status(200).json({success: true, message: "User Logged is Successfull!"})
     generateToken(user, "User Logged is Successfull!", 200, res);

})


export const isAdminRegistered =async (req,res,next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        dob,
        cnic,
        phone} = req.body;
        if(!firstName ||
            !lastName||
            !email||
            !password||
            !gender||
            !dob||
            !cnic||
            !phone)
            {
                return next(new ErrorHandler("Fill the Full Form", 400));
            }
            const isRegistered =await User.findOne({email});
            if(isRegistered){
                return next(new ErrorHandler("User is Already Exist!"));
            }
            const admin = await User.create({
                firstName,
                lastName,
                email,
                password,
                gender,
                dob,
                cnic,
                phone,role:"Admin"})
        res.status(200).json({
            success:true,
            message:"New Admin Is Registered Successfully!",

        });


};

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
})