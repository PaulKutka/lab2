const express  = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const app       = express()
const validator = require('express-validator');

//Require to parse body in json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(validator());
app.use('/', express.static('apidoc'));



app.use('/api/todo', router);



app.listen(3000, () => {
  console.log('Application is listening on port 3000');
});

module.exports = router;

