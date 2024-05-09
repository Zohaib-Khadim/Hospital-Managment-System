import  express  from "express";
import { isAdminRegistered, login, patientRegister } from '../controllers/userController.js';
import {isAdminAuthenticated,} from "../middlewares/auth.js"
const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,isAdminRegistered);



export default router;