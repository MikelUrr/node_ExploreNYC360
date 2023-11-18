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
  estacionPref: {
    type: String,
  },
  categoria: {
    type:[String]
  },
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
  solicitudReactivacion: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;