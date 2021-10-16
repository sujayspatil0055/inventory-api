const result = require('dotenv').config();
const express = require('express');
const app = express();
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