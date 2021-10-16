const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!!!');
});

router.post( '/user/register', userController.saveUser );

router.post('/user/login', userController.loginUser);

router.put('/user/update', userController.updateUser);

router.get('/user/get_user_by_email/:email', userController.getUserByEmail);

router.get('/user/get_user_by_id/:id', userController.getUserById);

// router.post('/user/register', (req, res) => {
//     // console.log(req);
//     let results = userController.saveUser(req.body)
//     // console.log(results);
//     res.send(results);
// });


module.exports = router;