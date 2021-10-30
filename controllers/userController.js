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
    console.log('login user');
    // find user
    // let userModelObject = new UserModal();
    console.log(req.body);
    let userBody = req.body.data;
    
    let userDetails = await UserModal.findOne({ email: userBody.email }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.send({status: 'fail', message: 'Account not found, please Sign up', data: {}});
    }

    if ( userDetails.password !== getHash(userBody.password) ) {
        res.send({status: 'fail', message: 'Email or password is invalid', data: {}});
    }

    let userData = {
        _id: userDetails._id,
        full_name: userDetails.full_name,
        email: userDetails.email
    };

    res.send({ status: 'success', message: "User found", data: userData});

};

// update user data based on email
updateUser = async (req, res) => {
    const userData = {
        full_name: req.body.full_name.trim(),
        _id: req.body._id.trim()
    };

    let options = {
        new: true,
        timestamps: true
    }
    const ud = await UserModal.findOneAndUpdate({ _id: userData._id }, { full_name: userData.full_name }, options);
        // .then( (result) => {
        //     console.log(result);
        // })
        // .catch( (error) => {
        //     console.log(error);
        // });
    
    //check user found or not 
    // then send response accordingly
    if(ud == null || ud == "") {
        res.send({
            status: 'fail',
            message: "Account not found, please try again.",
            data: {}
        });
    }

    res.send({
        status: 'success',
        message: "successfully updated",
        data: {
            _id: ud._id,
            full_name: ud.full_name,
            email: ud.email,
        }
    });

    
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
        email: userDetails.email,
        password: userDetails.password
    };
    res.send({ status: 'success', message: "User found", data: userData});   
};

/** Method: post
 */
forgetPassword = async (req, res) => {
    const userEmail = req.body.email.trim();
    // const userPassword = req.body.password.trim();

    if (userEmail == "" || userEmail == null) {
        res.send({
            status: 'fail',
            message: 'Email address is required.',
            data: {}
        });
    }

    if(req.body.password.trim() == "") {
        res.send({
            status: 'fail',
            message: 'Password cannot be empty.',
            data: {}
        });
    }

    // const userData = UserModel.findOne({ email: userEmail })
    // if (userData == null || userData == "") {
    //     res.send({
    //         status: 'fail',
    //         message: 'Account not found, please Sign up.',
    //         data: {}
    //     });
    // }

    const pw = getHash(req.body.password.trim());

    let options = {
        new: true,
        timestamps: true
    }

    const ud = await UserModal.findOneAndUpdate({ email: userEmail }, { password: pw }, options);
    
    // console.log(ud);
    if(ud == null || ud == "") {
        res.send({
            status: 'fail',
            message: "Account not found, please try again.",
            data: {}
        });
    }

    res.send({
        status: 'success',
        message: "Successfully password updated.",
        data: {
            _id: ud._id,
            // full_name: ud.full_name,
            // email: ud.email,
        }
    });
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
    forgetPassword,
    getUserById,
    getUserByEmail
};
