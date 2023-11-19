import userController from "../users/userController.js";
import registroController from "./registroController.js"
import bcrypt from "bcrypt";

const createForm = async (req, res) => {
    const error = req.query.error;
    const user = {
        nombre: "",
        email: "",
        fechaNacimiento: "",
        password: "",
        estacionPref: "",
        clasePref: "",
        numViajeros: "",
        longitudPref: "",
        selectionPref: [],
        localizacionPref: "",
        cuentaDesactivada: false,
        rol:"",
    };

    res.render("registro/new", { error, user });
};

const create = async (req, res) => {
    try {
        const { nombre, email, fechaNacimiento, password, confirmPassword, estacionPref, categoria } = req.body;

        
        if (password !== confirmPassword) {
            const errorMessage = "La contraseña y la confirmación no coinciden.";
            return res.redirect(`/registro?error=${encodeURIComponent(errorMessage)}`);
        }

        
        const [error, existingUser] = await registroController.findUserByEmail(email);

        if (existingUser) {
           
            if (existingUser.cuentaDesactivada) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await registroController.updateUser(existingUser._id, nombre, email, fechaNacimiento, hashedPassword, estacionPref, categoria);
            } else {
                
                const errorMessage = "El correo ya está en uso por otro usuario activo.";
                return res.redirect(`/registro?error=${encodeURIComponent(errorMessage)}`);
            }
        } else {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            await registroController.createUser(nombre, email, fechaNacimiento, hashedPassword, estacionPref, categoria);
        }

        
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        const uriError = encodeURIComponent(error.message || "Error desconocido");
        return res.redirect(`/registro?error=${uriError}`);
    }
};

export default {
   
    create,
    createForm,
};
