import bcrypt from "bcrypt";
import UserModel from "../../models/userModel.js"


// Controlador para el inicio de sesión.
const login = async (req, res) => {
    
    
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        
        
        if (!user) {
            throw new Error("Credenciales incorrectas paso 1");
        }

       

        if (user.cuentaDesactivada) {
            // Si la cuenta está desactivada y la solicitud de reactivación está pendiente, muestra un mensaje al usuario.
            if (user.solicitudReactivacion) {
                throw new Error("La cuenta está desactivada. La solicitud de reactivación está pendiente.");
            }
            
            // Si la solicitud de reactivación no está pendiente, marca la solicitud de reactivación como verdadera y muestra un mensaje al usuario.
            user.solicitudReactivacion = true;
            await user.save();
            throw new Error("La cuenta está desactivada. Se ha enviado una solicitud de reactivación.");
        }

        const hash = user.password;

        if (await bcrypt.compare(password, hash)) {
            req.session.user = user._id;
            req.session.rol = user.rol;
            req.session.name = user.nombre;
        } else {
            throw new Error("Contraseña incorrecta");
        }

        
        
        if (req.session.rol === "admin" || req.session.rol === "editor") {
            ;
            return res.redirect(`/gestion`);
        } else if (req.session.rol === "usuario") {
            
            return res.redirect(`/home`);
        }
    } catch (e) {
        const errorUri = encodeURIComponent(e.message || "Credenciales incorrectas");
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