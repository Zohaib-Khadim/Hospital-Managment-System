import {catchAsyncErrors} from './catchAsyncErrors.js';
import ErrorHandler from './errorMiddleware.js';
import jwt from 'jsonwebtoken';
// import { User } from '../models/userSchema';

// Admin Authentication and Authorization

// Authentication

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (! token) {
        return next(new ErrorHandler("Admin is not Authenticated", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    // Authorization
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${
            req.user.role
        } is not authorized for this resources!`, 403))
    }
    next();
});
// Patient Authentication and Authoriztion

// Authentication
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (! token) {
        return next(new ErrorHandler("Patient is not Authenticated", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);

    // Authorization
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${
            req.user.role
        } is not authorized for this resources!`, 403))
    }
    next();
});



// import { catchAsyncErrors } from './catchAsyncErrors.js';
// import ErrorHandler from './errorMiddleware.js';
// import jwt from 'jsonwebtoken';
// import {User} from '../models/userSchema.js'; // Ensure the correct import path for User model

// // Admin Authentication and Authorization
// export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const token = req.cookies.adminToken;
//     if (!token) {
//         return next(new ErrorHandler("Admin is not Authenticated", 400));
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = await User.findById(decoded.id);
//         if (req.user.role !== "Admin") {
//             return next(new ErrorHandler(`${req.user.role} is not authorized for this resource!`, 403));
//         }
//         next();
//     } catch (error) {
//         return next(new ErrorHandler("Invalid Token, please try again", 400));
//     }
// });

// // Patient Authentication and Authorization
// export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const token = req.cookies.patientToken;
//     if (!token) {
//         return next(new ErrorHandler("Patient is not Authenticated", 400));
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = await User.findById(decoded.id);
//         if (req.user.role !== "Patient") {
//             return next(new ErrorHandler(`${req.user.role} is not authorized for this resource!`, 403));
//         }
//         next();
//     } catch (error) {
//         return next(new ErrorHandler("Invalid Token, please try again", 400));
//     }
// });
