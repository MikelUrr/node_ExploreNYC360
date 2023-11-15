import bcrypt from "bcrypt";
import UserModel from "../../models/userModel.js"


// Controlador para el inicio de sesión.
const login = async (req, res) => {
    console.log("REQ BODY SOLO BODY", JSON.stringify(req.body));
    
 
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        console.log("REQ session", JSON.stringify(req.session.rol),user.rol);
        console.log(user);
        if (!user) {
            throw new Error("Credenciales incorrectas paso 1");
        }
        const hash = user.password;

        if (await bcrypt.compare(password, hash)) {
            req.session.user = user._id;
            // Asumo que tienes un campo 'rol' en tu modelo
            req.session.rol = user.rol;
            req.session.name= user.nombre;
        } else {
            throw new Error("Contraseña incorrecta");
        }
        console.log("todavia no  redirigiendo", JSON.stringify(req.session.rol), user.rol);
        if (req.session.rol === "admin" || req.session.rol === "editor") {
            console.log("Estoy redirigiendo", JSON.stringify(req.session.rol), user.rol);
            return res.redirect(`/gestion`);
        } else if(req.session.rol === "usuario"){
            console.log("Estoy redirigiendo usuario", JSON.stringify(req.session.rol), user.rol);
            return res.redirect(`/home`);
        }
        
    } catch (e) {
        const errorUri = encodeURIComponent("credenciales incorrectas PASO 2");
        return res.redirect("/login?error=" + errorUri);
    }
   
    
};
// Controlador para mostrar el formulario de inicio de sesión.
const loginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/login",{error:errorMessage});
}

// Controlador para cerrar sesión.
const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
}

// Exporta los controladores relacionados con la autenticación.
export default {
    login,
    loginForm,
    logout
}