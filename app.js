const result = require('dotenv').config();
const express = require('express');
const app = express();

// enable cross origin request for browsers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

// const bodyParser = require('body-parser');

/* Routes */
const userRoutes = require('./routes/userRoutes');

// convert every request to json string/object
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);
  
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.use(userRoutes);
// console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

// module.exports = server;