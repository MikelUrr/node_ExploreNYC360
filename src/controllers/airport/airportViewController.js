import airportController from "./airportController.js"
import TequilaApi from "./TequilaApi.js"

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





/* // Ruta de ejemplo que utiliza el módulo de búsqueda de vuelos
app.get('/search-flights', async (req, res) => {
    const queryParams = {
        // Define tus parámetros de búsqueda aquí o toma los valores de la solicitud, según tu lógica.
    };

    try {
        const flightResults = await searchFlights(queryParams);
        res.json(flightResults);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
 */
const createForm = async (req, res) => {
    try {
        const error = req.query.error;
        const busqueda = {
            fly_from: "",
            fly_to: "",
            date_from: "",
            date_to: "",
            return_from: "",
            return_to: "",
            adults: "",
            children: "",
            infants: "",
        };


        res.render("airport/new", { error, busqueda });
    } catch (error) {
        console.error("Error en createForm:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const create = async (req, res) => {
    try {
        const { fly_from, date_from, return_from, adults } = req.body;
        const userId = req.session.user;


        const fecha = new Date(date_from);

        // Obtener día, mes y año
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; 
        const ano = fecha.getFullYear();
        const date_from_fortmat = `${dia}/${mes}/${ano}`

        const fecha1 = new Date(return_from);

        // Obtener día, mes y año
        const dia1 = fecha1.getDate();
        const mes1 = fecha1.getMonth() + 1;
        const ano1 = fecha1.getFullYear();
        const return_from_fortmat = `${dia1}/${mes1}/${ano1}`


        console.log("ver fecha", date_from)

        const formData = {
            fly_from,
            date_from_fortmat,
            return_from,
            adults,
        };
        const params = {
            fly_from: fly_from,
            fly_to: 'NYC',
            date_from: date_from_fortmat,
            date_to: date_from_fortmat,
            return_from: return_from_fortmat,
            return_to: return_from_fortmat,
            ret_from_diff_city: true,
            ret_to_diff_city: true,
            one_for_city: 0,
            one_per_date: 0,
            adults: adults,
            selected_cabins: 'M',
            only_working_days: false,
            only_weekends: false,
            partner_market: 'us',
            max_stopovers: 2,
            max_sector_stopovers: 2,
            vehicle_type: 'aircraft',
            limit: 50,
        };

        const resultados = await TequilaApi.searchFlights(params)
        console.log(resultados)
        const [error, user] = await airportController.createairport(userId,resultados);
        
                if (error) {
                    const uriError = encodeURIComponent(error);
                    return res.redirect(`/users/new?error=${uriError}`);
                } 
        res.redirect("/airport");
    } catch (error) {
        console.error("Error en create:", error);
        res.status(500).send("Error interno del servidor");
    }
};






export default {
    getAllAirportView,
    getAirportByIdView,
    create,
    createForm,
};

