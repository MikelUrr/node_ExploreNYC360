import mongoose from "mongoose";
import mongodb from "../config/mongodb.js";

const userSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  estacionPref: String,
  clasePref: String,
  numViajeros: {
    type: Number,
    default: 1,
  },
  longitudPref: {
    type: String, // lo dejo como string por si quiero dejar la posibilidad de ingresar por ej de 1-15 dias, si es complicado cambio a number
  },
  selectionPref: [String], // Array 
  localizacionPref: String,
  fechaCreacionCuenta: {
    type: Date,
    default: Date.now,
  },
  cuentaDesactivada: {
    type: Boolean,
    default: false,
  },  rol: {
    type: String, 
    default: "usuario",
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;