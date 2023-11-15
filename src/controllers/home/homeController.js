const renderHomePage = (req, res) => {
    console.log("QUIERO VER QUE HAY AQUI", JSON.stringify(req.session));
    const user = req.query.user;
    const rol = req.query.rol;
    res.render("home", { session: req.session });
};

export default {
    renderHomePage,
};