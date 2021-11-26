const express = require('express');
var cors = require('cors');
const sequelize = require('./db/db');
const { Sequelize,QueryTypes } = require("sequelize");
const bodyParser = require('body-parser');

//TODO: Descomentar
// const route = require('./routes/routes');
/**
 * Initial config
 */
const app = express();
const port = 53001;
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`notes-app listening on port ${port}!`));


route(app)
