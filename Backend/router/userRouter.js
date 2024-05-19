import  express  from "express";
import { getAllDoctors, getUserDetails, isAdminRegistered, login, patientRegister,adminLogout, patientLogout, addNewDoctor } from '../controllers/userController.js';
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,isAdminRegistered);
router.get("/doctors",getAllDoctors);
router.get("/admin/me",getUserDetails,isAdminAuthenticated);
router.get("/patient/me",getUserDetails,isPatientAuthenticated);
router.get("/admin/adminLogout",isAdminAuthenticated,adminLogout);
router.get("/patinet/patientLogout",isPatientAuthenticated,patientLogout);
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor);
 


export default router;