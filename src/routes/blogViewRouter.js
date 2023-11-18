import { Router } from "express";
import {getBlogEntryByIdView} from "../controllers/blogViewer/blogViewerViewController.js";
import { isAuthenticated, isUsuario, isEditororAdmin } from "../middlewares/authMiddleware.js";

const router = Router();



router.get("/", isAuthenticated,isUsuario, (req, res) => {
    getBlogEntryByIdView(req, res);
});

export default router;
