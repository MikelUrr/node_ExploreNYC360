const renderGestionPage = (req, res) => {
    console.log("QUIERO VER QUE HAY AQUI", JSON.stringify(req.session));
    const user = req.query.user;
    const rol = req.query.rol;
    res.render("gestion", { session: req.session });
};

export default {
    renderGestionPage,
};