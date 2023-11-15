import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";


dotenv.config();
// Middleware de autenticación que verifica si un usuario ha iniciado sesión.
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // Si existe una sesión de usuario, se considera autenticado.
        next(); // Llama a la siguiente función en la cadena de middleware.
    } else {
        // Si no existe una sesión de usuario, se redirige al usuario a la página de inicio de sesión.
        res.redirect("/login");
    }
}

const isAdmin = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await UserModel.findById(req.session.user);

            if (user && user.rol === "admin") {
                // El usuario tiene permisos de administrador, permite el acceso.
                next();
            } else {
                // El usuario no es un administrador, redirige a la página de inicio de sesión.
                res.redirect("/login");
            }
        } catch (error) {
            // Maneja errores de la consulta a la base de datos, si los hay.
            console.error("Error al buscar al usuario en la base de datos:", error);
            res.redirect("/error"); // Puedes redirigir a una página de error personalizada.
        }
    } else {
        // Si no hay sesión de usuario, redirige a la página de inicio de sesión.
        res.redirect("/login");
    }
}
const isEditororAdmin = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await UserModel.findById(req.session.user);

            if (user && (user.rol === "editor"|| user.rol==="admin")) {
                // El usuario tiene permisos de administrador, permite el acceso.
                next();
            } else {
                // El usuario no es un administrador, redirige a la página de inicio de sesión.
                res.redirect("/login");
            }
        } catch (error) {
            // Maneja errores de la consulta a la base de datos, si los hay.
            console.error("Error al buscar al usuario en la base de datos:", error);
            res.redirect("/error"); // Puedes redirigir a una página de error personalizada.
        }
    } else {
        // Si no hay sesión de usuario, redirige a la página de inicio de sesión.
        res.redirect("/login");
    }
}
const isUsuario = async (req, res, next) => {
    if (req.session.user) {
        try {
            const user = await UserModel.findById(req.session.user);

            if (user && user.rol === "usuario") {
                // El usuario tiene permisos de administrador, permite el acceso.
                next();
            } else {
                // El usuario no es un administrador, redirige a la página de inicio de sesión.
                res.redirect("/login");
            }
        } catch (error) {
            // Maneja errores de la consulta a la base de datos, si los hay.
            console.error("Error al buscar al usuario en la base de datos:", error);
            res.redirect("/error"); // Puedes redirigir a una página de error personalizada.
        }
    } else {
        // Si no hay sesión de usuario, redirige a la página de inicio de sesión.
        res.redirect("/login");
    }
}

const isApiAuthenticated = (req,res,next) =>{
    const token = req.query.token;
    try{
        const decoded = jwt.verify(token,process.env.JSON_SECRET);
        console.log(decoded);
        req.user = decoded.user;
        next();
        
    }
    catch(e){
        console.log(e.message);
        res.status(401).send("authentication failed");
    }
} 
// Exporta el middleware de autenticación.
export {
    isAuthenticated,
    isAdmin,
    isEditororAdmin,
    isUsuario,
    isApiAuthenticated
};
