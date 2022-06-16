//call variables
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const sequelize = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//port and controler to use and cookies session
const routes = require('./controller');
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};

//what the server will use for the session
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//what port is bein used
sequelize.sync({ force: false }).then(()=>{
    app.listen(PORT,()=> console.log(`Listening to on ${PORT}`));
});
