import { Router } from "express";
import apiController from "../controllers/api/apiController.js"
import airportViewController from "../controllers/airport/airportViewController.js";
import { isAuthenticated, isUsuario, isEditororAdmin,isApiAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/new", isAuthenticated,isUsuario, airportViewController.createForm);
router.post("/", isAuthenticated, (req, res) => {
    airportViewController.create(req, res);
});

router.get("/", isAuthenticated,isUsuario, (req, res) => {
        airportViewController.getViewSearch(req, res);
});
export default router;