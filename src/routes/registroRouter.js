import { Router } from "express";
import registroViewController from "../controllers/registro/registroViewController.js"


const router = Router();

router.get("/", registroViewController.createForm);

router.post("/", (req, res) => {
    registroViewController.create(req, res);
});


export default router;