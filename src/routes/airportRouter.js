import { Router } from "express";
import airportController from "../controllers/airport/airportController.js"
import { isAuthenticated, isAdmin, isEditororAdmin,isApiAuthenticated } from "../middlewares/authMiddleware.js";
const router = Router();



router.get("/datos",(req,res)=>{
    airportController.apiAirport(req,res);
})

export default router;