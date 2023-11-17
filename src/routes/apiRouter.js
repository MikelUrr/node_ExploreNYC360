// apiRouter.js
import { Router } from "express";
import {getAllAirports} from "../controllers/api/apiController.js";

const router = Router();

console.log("Llegó a apiRouter.js");

router.get("/datos", (req, res) => {
    console.log("Llegó a la ruta /datos");
    // Asegúrate de llamar a la función con paréntesis ()
    getAllAirports(req, res);
});

export default router;
