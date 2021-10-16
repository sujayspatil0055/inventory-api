const userModel = require('../models/userModel');
const crypto = require('crypto');

saveUser = async (req, res) => {
    // console.log(userData);
    // debugger;
    // let response = {};
    const secret = 'abcdefg';
    const hashPassword = crypto.createHmac('sha1', secret)
                   .update(req.body.password)
                   .digest('hex');
    

    var userData = {
        full_name:   req.body.full_name, 
        email:       req.body.email, 
        password:    hashPassword,
    };
    
    let userModelObject = new userModel(userData); 
    // console.log(userModelObject);
    await userModelObject.save(function (error) {
        console.log('error');
        console.log(error);
        if (error) {
            res.send({
                status: 'fail',
                message: 'Unable save data, please try later.',
                data: {}
            });
        }
        res.send({
            status: 'success',
            message: 'Data saved successfully.',
            data: {}
        });
    });
    
    // console.log(result);

    // if(error){ 
    //     response.status = 'fail',
    //     response.message = 'error'
    //     // throw error;
    //     return response;
    // }
    // response.status = 'success',
    // response.message = 'Data saved successfully.'
    // return response;
    // // res.json({message : "", status : ""});
    // return result;
};

loginUser = async (req, res) => {

    // find user
    let userModelObject = new userModel();
    let userDetails = await userModelObject.findOne({ email: req.body.email });
    if ( userDetails == null || userDetails == "" ) {
        res.send({status: 'fail', message: 'User not found', data: []});
    }

    if ( userDetails.password != req.body.password ) {
        res.status(200).send({status: 'fail', message: 'Email or password is invalid', data: []});
    }

    let userData = {
        full_name: userData.full_name,
        email: userData.email
    };

    res.status(200).send({ status: 'success', message: "User found", data: userData});

};

module.exports = {
    saveUser,
    loginUser
};
