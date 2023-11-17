import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";


const busquedaSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    fechaCreacionBusqueda: {
        type: Date,
        default: Date.now,
      },
    search_id: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Puedes ajustar el tipo de datos según tus necesidades
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    fx_rate: {
        type: Number, 
        required: true,
    },search_number: {
        type: Number, 
        required: true,
    },
});

const BusquedaModel = mongoose.model('Busqueda', busquedaSchema);

export default BusquedaModel;