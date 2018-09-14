module.exports = function(app) {
    /*app.route('/example')
        .get((req,res) => res.render('pages/example')); <--- NOTE THE SEMICOLON */
    app.route('/')
        .get((req,res) => res.render('pages/index'));
    app.route('/map')
    	.get((req,res) => res.render('pages/MapUsingJson'));
}
