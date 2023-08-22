import  express  from "express";
import { 
    registerAdmin,
    authUser,
    logoutAdmin,
    getLoginTimes
} from "../controllers/adminController.js";


const router = express.Router()

router.post("/", registerAdmin)
router.post("/auth", authUser)
router.post("/logout", logoutAdmin)
router.get('/:adminId/loginTimes', getLoginTimes);

export default router