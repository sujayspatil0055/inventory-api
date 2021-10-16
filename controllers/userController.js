const UserModal = require('../models/userModel');
const crypto = require('crypto');

saveUser = async (req, res) => {
    // console.log(userData);
    const hashPassword = getHash(req.body.password);

    var userData = {
        full_name:   req.body.full_name.trim(), 
        email:       req.body.email.trim(), 
        password:    hashPassword,
    };
    
    // check email already exits or not
    let isUserFound = await UserModal.findOne({ email: userData.email }).exec()
    // console.log(isUserFound);
    if(isUserFound != null || isUserFound != "") {
        res.send({
            status: 'fail',
            message: 'Email already exits.',
            data: {}
        });
    }
    let userModelObject = new UserModal(userData); 

    userModelObject.save()
        .then( (result) => {
            res.send({
                status: 'success',
                message: 'Data saved successfully.',
                data: result
            });
        })
        .catch( (error) => {
            console.log(error);
            res.send({
                status: 'fail',
                message: 'Unable save data, please try later.',
                data: {}
            });
        });
};

loginUser = async (req, res) => {

    // find user
    // let userModelObject = new UserModal();
    let userDetails = await UserModal.findOne({ email: req.body.email }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.send({status: 'fail', message: 'User not found, please register', data: {}});
    }

    if ( userDetails.password != getHash(req.body.password) ) {
        res.send({status: 'fail', message: 'Email or password is invalid', data: {}});
    }

    let userData = {
        _id: userDetails._id,
        full_name: userDetails.full_name,
        email: userDetails.email
    };

    res.send({ status: 'success', message: "User found", data: userData});

};

updateUser = async (req, res) => {
    const userData = req.body;
    
}

getUserById = async (req, res) => {
    const id = req.params.id.trim();
    if(id == "") {
        res.send({status: 'fail', message: 'Please provide user id.', data: {}});
    }

    let userDetails = await UserModal.findOne({ _id: id }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.send({status: 'fail', message: 'User not found', data: {}});
    }
    let userData = {
        _id: userDetails._id,
        full_name: userDetails.full_name,
        email: userDetails.email
    };
    res.send({ status: 'success', message: "User found", data: userData});   
};

getUserByEmail = async (req, res) => {
    const email = req.params.email.trim();
    if (email == "") {
        res.send({status: 'fail', message: 'Please provide email address', data: {}});
    }

    let userDetails = await UserModal.findOne({ email: email }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.send({status: 'fail', message: 'User not found', data: {}});
    }
    let userData = {
        _id: userDetails._id,
        full_name: userDetails.full_name,
        email: userDetails.email
    };
    res.send({ status: 'success', message: "User found", data: userData});   
};

function getHash(password) {
    const secret = process.env.SECRET;
    // let hashPromise = new Promise( (resolve, reject) => {
    //     crypto.createHmac('sha1', secret)
    //         .update(req.body.password)
    //         .digest('hex');
    // });
    return crypto.createHmac('sha1', secret)
                   .update(password)
                   .digest('hex');
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    getUserById,
    getUserByEmail
};
