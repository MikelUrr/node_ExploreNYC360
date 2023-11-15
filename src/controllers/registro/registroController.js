import UserModel from "../../models/userModel.js"

const createUser = async (nombre, email, fechaNacimiento, password, estacionPref, clasePref, numViajeros, longitudPref, selectionPref, localizacionPref, cuentaDesactivada,rol) => {
    try {
        const newUser = new UserModel({
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento,
            password: password,
            estacionPref: estacionPref,
            clasePref: clasePref,
            numViajeros: numViajeros,
            longitudPref: longitudPref,
            selectionPref: selectionPref,
            localizacionPref: localizacionPref,
            cuentaDesactivada: cuentaDesactivada,
            rol:rol,
        });

        const savedUser = await newUser.save();
        return [null, savedUser];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};



export default {
  
    createUser
};

export  {
 
    createUser
}
