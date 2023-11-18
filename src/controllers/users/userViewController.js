import userController from "./userController.js";
import bcrypt from "bcrypt";

const getAllUsersView = async (req, res) => {
    const errorMessage = req.query.error;
    const [error, users] = await userController.getAllUsers();
    res.render("users/list", { error: error || errorMessage, users, session: req.session });
};

const getUserByIdView = async (req, res) => {
    const id = req.params.id;
    const [error, user] = await userController.getUsersById(id);
    res.render("users/list", { error, user, session: req.session });
};

const updateForm = async (req, res) => {
    const errorMessage = req.query.error;
    const id = req.params.id;
    const [error, user] = await userController.getUsersById(id);

    try {
        if (error) {
            res.redirect("/users");
        }

        res.render("users/edit", { error: errorMessage, user });
    } catch (error) {
        console.error(error);
        res.redirect("/users");
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    const { nombre, email, fechaNacimiento, password, confirmPassword, estacionPref, categoria, cuentaDesactivada, rol } = req.body;

    try {
        console.log("password", typeof password, password);
        console.log("confirmPassword", typeof confirmPassword, confirmPassword);

        if (password && password !== confirmPassword) {
            const errorMessage = "La contraseña y la confirmación no coinciden.";
            return res.redirect(`/users/${id}/edit?error=${encodeURIComponent(errorMessage)}`);
        }

        let error;
        let user;

        if (password === "" || confirmPassword === "") {
            [error, user] = await userController.updateUser(id, nombre, email, fechaNacimiento, password, estacionPref, categoria, cuentaDesactivada, rol);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            [error, user] = await userController.updateUser(id, nombre, email, fechaNacimiento, hashedPassword, estacionPref, categoria, cuentaDesactivada, rol);
        }

        if (error) {
            const uriError = encodeURIComponent(error);
            return res.redirect(`/users/${id}/edit?error=${uriError}`);
        }

        res.redirect(`/users/`);
    } catch (error) {
        console.error(error);
        const uriError = encodeURIComponent("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
        return res.redirect(`/users/${id}/edit?error=${uriError}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    const [error, user] = await userController.removeUser(id);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/users?error=${uriError}`);
    }

    res.redirect("/users");
};

const createForm = async (req, res) => {
    const error = req.query.error;
    const user = {
        nombre: "",
        email: "",
        fechaNacimiento: "",
        password: "",
        estacionPref: "",
        categoria:"",
        cuentaDesactivada: false,
        rol:"",
    };

    res.render("users/new", { error, user });
};

const create = async (req, res) => {
console.log(req.body)
    const { nombre, email, fechaNacimiento, password,confirmPassword, estacionPref, categoria, cuentaDesactivada,rol } = req.body;
    if (password && password !== confirmPassword) {
        const errorMessage = "La contraseña y la confirmación no coinciden.";
        
        return res.redirect(`/users/edit?error=${errorMessage}`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [error, user] = await userController.createUser(nombre, email, fechaNacimiento, hashedPassword, estacionPref,categoria, cuentaDesactivada,rol);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/users/new?error=${uriError}`);
    }

    res.redirect("/users");
};

export default {
    getAllUsersView,
    updateForm,
    update,
    getUserByIdView,
    remove,
    create,
    createForm,
};
