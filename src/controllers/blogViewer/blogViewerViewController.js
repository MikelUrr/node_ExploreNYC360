import {getAllBlogEntries} from "./blogViewerController.js"

const getBlogEntryByIdView = async (req, res) => {
    const id = req.session.user;
    const [error, entry] = await getAllBlogEntries(id);
    console.log(entry, "tamaño:  ",entry.length)
    res.render("guia/list", { error, entry, session: req.session });
};

export default getBlogEntryByIdView;
export {
    getBlogEntryByIdView}