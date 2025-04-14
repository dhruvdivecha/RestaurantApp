import express from "express"
import multer from "multer"
import MyRestaurantController from "../controllers/MyRestaurantController"
import  auth  from "../middleware/auth"
import { validateMyRestaurantRequest } from "../middleware/validation"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 5
    } //5mb limit
})

router.post("/",
    upload.single("image"),
    auth.jwtCheck,
    auth.jwtParse,
    validateMyRestaurantRequest,
    MyRestaurantController.CreateMyRestaurant
)


export default router