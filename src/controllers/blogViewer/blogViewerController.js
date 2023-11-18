import BlogEntry from "../../models/blogEntryModel.js";
import UserModel from "../../models/userModel.js"

// filtro para entradas de blog

const getAllBlogEntries = async (id) => {
    try {
        const entries = await BlogEntry.find({});
        const user= await UserModel.findById(id).exec();
        const result= []
        entries.forEach(entry => {
            if (user.estacionPref === entry.categoriaMes &&
                user.categoria.some(categoria => entry.categoria.includes(categoria))) {
                result.push(entry);
            }
        });
        return [null, result];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};


export default getAllBlogEntries;
export {
    getAllBlogEntries
}