import { Router } from "express";
import fotoViewController from "../controllers/foto/fotoViewController.js"
import { isAuthenticated, isUsuario } from "../middlewares/authMiddleware.js";

const router = Router();



router.post("/", fotoViewController.upload.single('fotoSubir'), (req, res) => {
    fotoViewController.subirFile(req, res);
});
router.get("/", isAuthenticated,isUsuario, (req, res) => {
    fotoViewController.renderFotoPage(req, res);
});



export default router;