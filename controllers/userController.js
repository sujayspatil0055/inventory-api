const userModel = require('../models/userModel');
const crypto = require('crypto');

async function saveUser(userData) {
    // console.log(userData);
    // debugger;
    let response = {};
    const secret = 'abcdefg';
    const hashPassword = crypto.createHmac('sha1', secret)
                   .update(userData.password)
                   .digest('hex');
    

    var userData = {
        full_name:   userData.full_name, 
        email:       userData.email, 
        password:    hashPassword,
        created_at:  new Date(),
        updated_at:  new Date()
    };
    
    let userModelObject = new userModel(userData); 
    let result = await userModelObject.save(function (error) {
        if (error) {
            response.status = 'fail',
            response.message = 'Unable save data, please try later.',
            response.data = {}
        }
        response.status = 'success',
        response.message = 'Data saved successfully.',
        response.data = {}
    });
    
    console.log(result);

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
}


module.exports = {
    saveUser
};
