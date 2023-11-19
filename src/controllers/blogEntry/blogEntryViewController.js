import blogEntryController from "./blogEntryController.js";
import fs from "fs";

const getAllBlogEntriesView = async (req, res) => {
    const errorMessage = req.query.error;
    const [error, entries] = await blogEntryController.getAllBlogEntries();
    res.render("blog/list", { error: error || errorMessage, entries, session: req.session });
};

const getBlogEntryByIdView = async (req, res) => {
    const id = req.params.id;
    const [error, entry] = await blogEntryController.getBlogEntryById(id);
    res.render("blog/list", { error, entry, session: req.session });
};

const updateBlogEntryForm = async (req, res) => {
    const errorMessage = req.query.error;
    const id = req.params.id;
    const [error, entry] = await blogEntryController.getBlogEntryById(id);

    try {
        if (error) {
            res.redirect("/blog");
        }

        res.render("blog/edit", { error: errorMessage, entry });
    } catch (error) {
        console.error(error);
        res.redirect("/blog");
    }
};

const updateBlogEntry = async (req, res) => {
    const id = req.params.id;
    console.log(req.params)
    const { titulo, contenido, categoria, categoriaMes, autor } = req.body;
    const foto = `/images/blog/${req.file.filename}`;
  
    
    try {
        const [error, entry] = await blogEntryController.updateBlogEntry(id, titulo, contenido, categoria, categoriaMes, autor, foto);

        if (error) {
            const uriError = encodeURIComponent(error);
            return res.redirect(`/blog/${id}/edit?error=${uriError}`);
        }

        res.redirect(`/blog/`);
    } catch (error) {
        console.error(error);
        const uriError = encodeURIComponent("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
        return res.redirect(`/blog/${id}/edit?error=${uriError}`);
    }
};

const removeBlogEntry = async (req, res) => {
    const id = req.params.id;
    const [error, entry] = await blogEntryController.removeBlogEntry(id);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/blog?error=${uriError}`);
    } else {
        const photoPath = "public" + entry.foto;  
        if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Fichero borrado");
                }
            });
        } else {
            console.log("Fichero borrado.")
        }
    }

    res.redirect("/blog");
};


const createBlogEntryForm = async (req, res) => {
    const error = req.query.error;
    const entry = {
        titulo: "",
        contenido: "",
        categoria: "",
        categoriaMes: "",
        autor: "",
        foto: "",
    };

    res.render("blog/new", { error, entry });
};

const createBlogEntry = async (req, res) => {
    console.log("holaaaaaaaaa", req.body)
    const { titulo, contenido, categoria, categoriaMes, autor } = req.body;
    let photo = null;

    if (req.file) {
        photo = "/images/blog/" + req.file.filename;
    }

    const [error, entry] = await blogEntryController.createBlogEntry(titulo, contenido, categoria, categoriaMes, autor, photo);

    if (error) {
        const uriError = encodeURIComponent(error);
        return res.redirect(`/blog/new?error=${uriError}`);
    }

    res.redirect("/blog");
};

export default {
    getAllBlogEntriesView,
    updateBlogEntryForm,
    updateBlogEntry,
    getBlogEntryByIdView,
    removeBlogEntry,
    createBlogEntry,
    createBlogEntryForm,
};
