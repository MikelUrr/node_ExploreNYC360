import { Router } from "express";
import userViewController from "../controllers/users/userViewController.js"
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/new", isAuthenticated, userViewController.createForm);

router.post("/", isAuthenticated, (req, res) => {
    userViewController.create(req, res);
});

router.get("/:id/edit", isAuthenticated, isAdmin, userViewController.updateForm);

router.get("/:id/delete", isAuthenticated, isAdmin, (req, res) => {
    userViewController.remove(req, res);
});

router.post("/:id", isAuthenticated, isAdmin, (req, res) => {
    userViewController.update(req, res);
});

router.get("/:id", isAuthenticated, (req, res) => {
    userViewController.getUserByIdView(req, res);
});

router.get("/", isAuthenticated, (req, res) => {
    userViewController.getAllUsersView(req, res);
});

export default router;
