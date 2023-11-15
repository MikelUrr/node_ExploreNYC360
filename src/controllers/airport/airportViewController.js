import airportController from "./airportController.js";

const getAllAirportView = async (req, res) => {
    const errorMessage = req.query.error;
    const [error, users] = await airportController.getAllAirport();
    res.render("airport/list", { error: error || errorMessage, users, session: req.session });
};

const getAirportByIdView = async (req, res) => {
    const id = req.params.id;
    const [error, user] = await airportController.getAirportById(id);
    res.render("airport/list", { error, user, session: req.session });
};

const createForm = async (req, res) => {
    const error = req.query.error;
    const busqueda = {
        origen: "",
        fechaida: "",
        fechavuelta : "",
        clasePref: "",
        numViajeros: "",
    };

    res.render("airport/new", { error, busqueda });
};

const create = async (req, res) => {

    const { origen,fechaida,fechavuelta,clasePref,numViajeros } = req.body;
    const email= req.session.email
   
    const [error, user] = await userController.createairport(email,origen,fechaida,fechavuelta,clasePref,numViajeros);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/users/new?error=${uriError}`);
    }

    res.redirect("/users");
};


export default {
    getAllAirportView,
    getAirportByIdView,
    create,
    createForm,
};

