const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const expressHandlebars = require('express-handlebars').engine;

require('dotenv').config();

const app = express();
const serverPort = process.env.SERVER_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CustomerRoute = require('./routes/CustomerRoutes');

app.use(express.static('public'));

app.engine('hbs', expressHandlebars({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

// Define MySQL connection pool
const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Attempt to get a connection from the pool
connectionPool.getConnection((error, connection) => {
    if (error) {
        throw error;
    }
    console.log('MySQL connected!');
    // Release the connection back to the pool
    connection.release();
});

// Define routes
app.use('/', CustomerRoute);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(serverPort, () => {
    console.log(`Server started and running on port ${serverPort}`);
});
