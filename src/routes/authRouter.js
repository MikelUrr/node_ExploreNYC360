import { Router } from "express";

import authController from "../controllers/auth/authController.js"

const router = Router();

router.get("/login",(req,res)=>{
    authController.loginForm(req,res);
})

router.post("/login",(req,res)=>{
    authController.login(req,res);
})

/* router.get("/register",(req,res)=>{
    authController.registerForm(req,res);
})

router.post("/register",(req,res)=>{
    authController.register(req,res);
}) */

router.get("/logout",authController.logout)

export default router;