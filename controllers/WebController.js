exports.showHome = (req, res) => {
    res.render('home', { title: "Peyek Enak - Beranda" });
};

exports.showGallery = (req, res) => {
    res.render('gallery', { title: "Peyek Enak - Gallery" });
};