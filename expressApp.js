const express  = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const app       = express()
const validator = require('express-validator');

//Require to parse body in json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(validator());
app.use('/', express.static('apidoc'));



app.use('/api/todo', router);



app.listen(3000, () => {
  console.log('Application is listening on port 3000');
});

module.exports = router;

