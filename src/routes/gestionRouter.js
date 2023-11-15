import { Router } from "express";
import gestionViewController from "../controllers/gestion/gestionViewController.js"
import { isAuthenticated, isEditororAdmin } from "../middlewares/authMiddleware.js";

const router = Router();



router.get("/", isAuthenticated,isEditororAdmin, (req, res) => {
    gestionViewController.renderGestionPage(req, res);
});

export default router;
