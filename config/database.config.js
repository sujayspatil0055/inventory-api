const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then( (result) => console.log('connected to database'))
    .catch( (error) => console.log(error));

module.exports = mongoose;