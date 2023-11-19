const renderGestionPage = (req, res) => {
    
    const user = req.query.user;
    const rol = req.query.rol;
    res.render("gestion", { session: req.session });
};

export default {
    renderGestionPage,
};