import airportModel from "../../models/airportModel.js";

const getAllAirports = async (req, res) => {
    try {
        console.log("Llegó a la ruta apiController");
        const results = await airportModel.findAll();
        console.log(results);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default getAllAirports;
export {
    getAllAirports
}

