import { Router } from "express";
import apiController from "../controllers/api/apiController.js"
import airportViewController from "../controllers/airport/airportViewController.js";
import { isAuthenticated, isAdmin, isEditororAdmin,isApiAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/new", isAuthenticated, airportViewController.createForm);
router.post("/", isAuthenticated, (req, res) => {
    airportViewController.create(req, res);
});


export default router;