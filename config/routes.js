module.exports = function(router) {
// Home Page Handlebars Router
router.get("/", function(req,res) {
    res.render("home");
});
// Saved Handlebars Page Router
router.get("/saved", function(req,res){
    res.render("saved");
});
}