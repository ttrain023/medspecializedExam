const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/userModel');


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name : req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, userModel) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User Registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserbyEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not Found!'});
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 1800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password! '})
            }
        });
    });
});

// Profile
router.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

// Validate
// router.get('/validate', (req, res, next) => {
//     res.send('VALIDATE');
// });

module.exports = router;