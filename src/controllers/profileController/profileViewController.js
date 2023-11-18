import profileController from "./profileController.js"

const getUserByIdView = async (req, res) => {
    const id = req.session.user;
    const [error, user] = await profileController.getUsersById(id);
    res.render("miprofile/list", { error, user, session: req.session });
};
const unsuscribreRender = async (req, res) => {
    try {
        const error = req.query.error;
        const id = req.session.user;
        if (error) {
            res.redirect("/myprofile");
        }
res.render("miprofile/borrar", { error: error});
    } catch (error) {
        console.error(error);
        res.redirect("/myprofile");
    }
};
   
   


const unsubscribe = async (req, res) => {

    const id = req.session.user;
   
    const [error,unsuscriberUser]= await profileController.unsubscriber(id)
    res.redirect("../login");
    
}

const updateForm = async (req, res) => {
    const errorMessage = req.query.error;
    const id = req.session.user;
    const [error, user] = await profileController.getUsersById(id);

    try {
        if (error) {
            res.redirect("/myprofile");
        }

        res.render("miprofile/edit", { error: errorMessage, user });
    } catch (error) {
        console.error(error);
        res.redirect("/myprofile");
    }
};

const update = async (req, res) => {
    const id = req.session.user;
    const { nombre, email, fechaNacimiento, password, confirmPassword, estacionPref, categoria } = req.body;

    try {
        console.log("password", typeof password, password);
        console.log("confirmPassword", typeof confirmPassword, confirmPassword);

        if (password && password !== confirmPassword) {
            const errorMessage = "La contraseña y la confirmación no coinciden.";
            return res.redirect(`/myprofile/edit?error=${encodeURIComponent(errorMessage)}`);
        }

        let error;
        let user;

        if (password === "" || confirmPassword === "") {
            [error, user] = await profileController.updateUser(id, nombre, email, fechaNacimiento, password, estacionPref, categoria);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            [error, user] = await profileController.updateUser(id, nombre, email, fechaNacimiento, hashedPassword, estacionPref);
        }

        if (error) {
            const uriError = encodeURIComponent(error);
            return res.redirect(`/myprofile/edit?error=${uriError}`);
        }

        res.redirect(`/myprofile/`);
    } catch (error) {
        console.error(error);
        const uriError = encodeURIComponent("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
        return res.redirect(`/myprofile/edit?error=${uriError}`);
    }
};
export default {
    
    updateForm,
    update,
    getUserByIdView,
    unsuscribreRender,
    unsubscribe
};
