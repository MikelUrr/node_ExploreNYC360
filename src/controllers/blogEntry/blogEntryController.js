import BlogEntry from "../../models/blogEntryModel.js";

// CRUD para entradas del blog

const getAllBlogEntries = async () => {
    try {
        const entries = await BlogEntry.find({});
        return [null, entries];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const getBlogEntryById = async (id) => {
    try {
        const entry = await BlogEntry.findById(id).exec();
        return [null, entry];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const createBlogEntry = async (titulo, contenido, categoria, categoriaMes, autor, foto) => {
    try {
        const newEntry = new BlogEntry({
            titulo: titulo,
            contenido: contenido,
            categoria: categoria,
            categoriaMes: categoriaMes,
            autor: autor,
            foto: foto
        });

        const savedEntry = await newEntry.save();
        return [null, savedEntry];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const updateBlogEntry = async (id, titulo, contenido, categoria, categoriaMes, autor, foto) => {
    if (id === undefined) {
        const error = "Debes especificar un ID válido";
        return [error, null];
    }

    try {
        const entry = await BlogEntry.findById(id);

        if (!entry) {
            const error = "No se ha encontrado una entrada de blog con el ID proporcionado.";
            return [error, null];
        }

        // Puedes agregar validaciones adicionales aquí según tus necesidades

        entry.titulo = titulo;
        entry.contenido = contenido;
        entry.categoria = categoria;
        entry.categoriaMes = categoriaMes;
        entry.autor = autor;
        if (foto!=undefined){
            entry.foto = foto;
        }
        

        await entry.save();

        return [null, entry];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

const removeBlogEntry = async (id) => {
    try {
        const entry = await BlogEntry.findById(id);

        if (!entry) {
            const error = "No se ha encontrado ninguna entrada de blog con ese ID.";
            return [error, null];
        }

        await entry.deleteOne();

        return [null, entry];
    } catch (error) {
        console.error(error);
        return [error.message, null];
    }
};

export default {
    getAllBlogEntries,
    getBlogEntryById,
    updateBlogEntry,
    removeBlogEntry,
    createBlogEntry
};
