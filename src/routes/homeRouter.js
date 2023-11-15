import { Router } from "express";
import renderController from "./../controllers/home/homeController.js"
import { isAuthenticated, isUsuario } from "../middlewares/authMiddleware.js";


const router = Router();



router.get("/", isAuthenticated,isUsuario, (req, res) => {
    renderController.renderHomePage(req, res);
});

export default router;