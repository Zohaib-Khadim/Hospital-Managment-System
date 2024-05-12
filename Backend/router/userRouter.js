import  express  from "express";
import { getAllDoctors, getUserDetails, isAdminRegistered, login, patientRegister } from '../controllers/userController.js';
import {isAdminAuthenticated, isPatientAuthenticated,} from "../middlewares/auth.js"
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminRegistered,isAdminAuthenticated);
router.get("/doctors",getAllDoctors);
router.get("/admin/me",getUserDetails,isAdminAuthenticated);
router.get("/patient/me",getUserDetails,isPatientAuthenticated);
 


export default router;