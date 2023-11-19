import UserModel from "../../models/userModel.js"

const createUser = async (nombre, email, fechaNacimiento, password, estacionPref,categoria) => {
    try {
        const newUser = new UserModel({
            nombre: nombre,
            email: email,
            fechaNacimiento: fechaNacimiento,
            password: password,
            estacionPref: estacionPref,
            categoria:categoria,
            
 
        });

        const savedUser = await newUser.save();
        return [null, savedUser];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email });
        
        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const updateUser = async (userId, nombre, email, fechaNacimiento, password, estacionPref, categoria) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            const error = "No se ha encontrado un usuario con el ID proporcionado.";
            return [error, null];
        }

        
        // Actualizar los valores del usuario
        user.nombre = nombre;
        user.email = email;
        user.fechaNacimiento = fechaNacimiento;
        user.password = password; 
        user.estacionPref = estacionPref;
        user.categoria=categoria,
        user.solicitudReactivacion="true";
        

        // Guardar los cambios
        await user.save();

        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

export default {
  
    createUser,
    findUserByEmail,
    updateUser
};

export  {
 
    createUser,
    findUserByEmail,
    updateUser
}
