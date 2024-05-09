import { catchAsyncErrors } from './catchAsyncErrors.js';
import ErrorHandler from './errorMiddleware.js';
import  jwt  from 'jsonwebtoken';

//Admin Authentication and Authorization

// Authentication

export const isAdminAuthenticated =catchAsyncErrors(async(req,res,next) =>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin is not Authenticated",400));
    }
    const decode = jwt.verify(token ,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    //Authorization
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resources!`,403))
    }
    next();
}); 
// Patient Authentication and Authoriztion

    //Authentication
export const isPatientAuthenticated =catchAsyncErrors(async(req,res,next) =>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Patient is not Authenticated",400));
    }
    const decode = jwt.verify(token ,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);

    //Authorization
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resources!`,403))
    }
    next();
}); 