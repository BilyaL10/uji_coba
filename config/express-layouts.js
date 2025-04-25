const expressLayouts = require('express-ejs-layouts');
const path = require('path');

module.exports = (app) => {
    // Set up express-ejs-layouts
    app.use(expressLayouts);
    app.set('layout', path.join(__dirname, '../views/layouts/main'));
    app.set('view engine', 'ejs');
    
    // Extract stylesheets and scripts to avoid duplicating resources
    app.set('layout extractStyles', true);
    app.set('layout extractScripts', true);
}; 