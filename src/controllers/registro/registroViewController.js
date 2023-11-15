import userController from "../users/userController.js";
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

    const { nombre, email, fechaNacimiento, password,confirmPassword, estacionPref, clasePref, numViajeros, longitudPref, selectionPref, localizacionPref, cuentaDesactivada,rol } = req.body;
    if (password && password !== confirmPassword) {
        const errorMessage = "La contraseña y la confirmación no coinciden.";
        
        return res.redirect(`/registro?error=${errorMessage}`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [error, user] = await userController.createUser(nombre, email, fechaNacimiento, hashedPassword, estacionPref, clasePref, numViajeros, longitudPref, selectionPref, localizacionPref, cuentaDesactivada,rol);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/registro?error=${uriError}`);
    }

    res.redirect("/login");
};

export default {
   
    create,
    createForm,
};
