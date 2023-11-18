import { Router } from "express";
import profileViewController from "../controllers/profileController/profileViewController.js"
import { isAuthenticated, isUsuario } from "../middlewares/authMiddleware.js";

const router = Router();





router.get("/edit", isAuthenticated, isUsuario, profileViewController.updateForm);

router.get("/borrar", isAuthenticated, isUsuario, profileViewController.unsuscribreRender);
router.post("/borrar", isAuthenticated, isUsuario, profileViewController.unsubscribe);

router.post("/", isAuthenticated, isUsuario, (req, res) => {
    profileViewController.update(req, res);
});

router.get("/", isAuthenticated,isUsuario, (req, res) => {
    profileViewController.getUserByIdView(req, res);
});



export default router;
