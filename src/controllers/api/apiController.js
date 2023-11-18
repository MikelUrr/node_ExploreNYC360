import airportModel from "../../models/airportModel.js";

const getAllAirports = async (req, res) => {
    try {
        
        const results = await airportModel.findAll();
    
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default getAllAirports;
export {
    getAllAirports
}

