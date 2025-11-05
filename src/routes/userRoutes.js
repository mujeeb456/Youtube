import { Router } from "express";
import userController from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post('/Register', upload.fields([           
    {
        name:"avatar",
        maxCount:1  
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),
    
    userController.register)

export default router;