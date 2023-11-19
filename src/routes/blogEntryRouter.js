import { Router } from "express";
import blogEntryViewController from "../controllers/blogEntry/blogEntryViewController.js";
import { isAuthenticated, isAdmin, isEditororAdmin } from "../middlewares/authMiddleware.js";
import upload from '../controllers/blogEntry/multerConfig.js'; 
const router = Router();

router.get("/new", isAuthenticated,isEditororAdmin,  blogEntryViewController.createBlogEntryForm);

router.post("/",  isAuthenticated,isEditororAdmin, upload.single('fotoSubir'), (req, res) => {
    blogEntryViewController.createBlogEntry(req, res);
});

router.get("/:id/edit", isAuthenticated,isEditororAdmin,  blogEntryViewController.updateBlogEntryForm);

router.get("/:id/delete", isAuthenticated,isEditororAdmin,   (req, res) => {
    blogEntryViewController.removeBlogEntry(req, res);
});

router.post("/:id", isAuthenticated, isEditororAdmin, upload.single('fotoSubir'),  (req, res) => {
    blogEntryViewController.updateBlogEntry(req, res);
});

router.get("/:id",  isAuthenticated,isEditororAdmin,  (req, res) => {
    blogEntryViewController.getBlogEntryByIdView(req, res);
});

router.get("/", isAuthenticated,isEditororAdmin,  (req, res) => {
    blogEntryViewController.getAllBlogEntriesView(req, res);
});

export default router;
