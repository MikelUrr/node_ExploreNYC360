import UserModel from "../../models/userModel.js"

const getUsersById = async (id)=> {
    try {
        const user= await UserModel.findById(id).exec();
        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
    
}

const unsubscriber=async(id)=>{
    try {
        
        const user = await UserModel.findOneAndUpdate(
            { _id: id }, 
            { $set: { cuentaDesactivada: true } },
           
        );
        

        return [null, user];

    } catch (error) {
        
    }
}

const updateUser = async (id, nombre, email, fechaNacimiento, password, estacionPref, categoria) => {
    if (id === undefined) {
        const error = "Tienes que especificar un ID válido";
        return [error, null];
    }

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            const error = "No se ha encontrado un usuario con el ID proporcionado.";
            return [error, null];
        }

        // Verificar si el correo ya está en uso por otro usuario
        const existingUser = await UserModel.findOne({ email: email, _id: { $ne: id } }); // $ne  es not equal en mongo
        if (existingUser) {
            const error = "El correo ya está en uso.";
            return [error, null];
        }

        user.nombre = nombre;
        user.email = email;
        user.fechaNacimiento = fechaNacimiento;
        if(password!==""){
            user.password = password;
        }else{
            user.password = user.password;
        }
        
        user.estacionPref = estacionPref;
        user.categoria = categoria;
  

        await user.save();

        return [null, user];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

export {
    getUsersById, 
    updateUser,
    unsubscriber,
    
}
export default {
    getUsersById, 
    updateUser,
    unsubscriber,
    
}