const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!!!');
});

router.post( '/user/register', userController.saveUser );

router.post('/user/login', userController.loginUser);
// router.post('/user/register', (req, res) => {
//     // console.log(req);
//     let results = userController.saveUser(req.body)
//     // console.log(results);
//     res.send(results);
// });


module.exports = router;