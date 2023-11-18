import { Router } from "express";
import userRouter from "./userRouter.js"
import blogEntryRouter from "./blogEntryRouter.js"
import authRouter from "./authRouter.js";
import gestionRouter from "./gestionRouter.js"
import registroRouter from "./registroRouter.js"
import fotoRouter from "./fotoRouter.js"
import airportRouter from "./airportRouter.js"
import homeRouter from "./homeRouter.js"
import apiRouter from "./apiRouter.js"
import blogViewRouter from "./blogViewRouter.js"

// aqui metor los import a los routers

// Crea una instancia de Router para definir rutas.
const router = Router();

/* 

A partir de aqui meter las rutas:
//Creamos ruta para canidates

router.use("/candidates",candidatesRouter);
 */
router.use("/",apiRouter);
router.use("/users",userRouter);
router.use("/blog",blogEntryRouter);
router.use("/gestion",gestionRouter);
router.use("/registro",registroRouter);
router.use("/foto",fotoRouter);
router.use("/home",homeRouter);
router.use("/airport",airportRouter)
router.use("/guia",blogViewRouter)




  








//Creamos ruta para login

router.use("/",authRouter);

// Exporta el objeto de rutas para su uso en la aplicación.
export default router;