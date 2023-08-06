const createError = require('http-errors');
const { users } = require('../models/userModel');


const getUsers = (req,res)=>{
    try {
        res.status(200).json({
            message: "user profile is returned",
            users: users,
        });
    } catch (error) {
        next(error);
    };
};

module.exports = {getUsers};