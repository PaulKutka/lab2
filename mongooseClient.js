let mongoose = require('mongoose');
mongoose.createConnection(
    'mongodb://pauliusk:root@ds151060.mlab.com:51060/lab4'
);

module.exports = mongoose;