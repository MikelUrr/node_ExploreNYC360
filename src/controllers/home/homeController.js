const renderHomePage = (req, res) => {
    
    const user = req.query.user;
    const rol = req.query.rol;
    res.render("home", { session: req.session });
};

export default {
    renderHomePage,
};