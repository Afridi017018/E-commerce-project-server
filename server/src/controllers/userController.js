const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const { jwtKey, clientURL } = require('../secret');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const emailWithNodeMailer = require('../helper/email');
const fs = require('fs').promises;




const getUsers = async (req, res, next) => {
    try {

        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + '.*', 'i');

        const filter = {
            isAdmin: { $ne: true },

            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } }
            ]
        };

        const options = { password: 0 };

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit)

        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, 'no user found');



        return successResponse(res, {
            statusCode: 200,
            message: 'user profile is returned',
            payload: {
                users: users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,

                }
            }
        })

    } catch (error) {
        next(error);
    };
};





const getUserById = async (req, res, next) => {
    try {

        const id = req.params.id;

        const options = { password: 0 };
        const user = await findWithId(User, id, options);


        return successResponse(res, {
            statusCode: 200,
            message: 'user is returned',
            payload: {
                user,
            }
        })

    } catch (error) {

        next(error);
    };
};





const deleteUserById = async (req, res, next) => {
    try {

        const id = req.params.id;
        const options = { password: 0 };
        const user = await findWithId(User, id, options);

        const userImagePath = user.image;


        await deleteImage(userImagePath);

        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false
        })

        return successResponse(res, {
            statusCode: 200,
            message: 'user was deleted successfully',

        })

    } catch (error) {

        next(error);
    };
};



const processRegister = async (req, res, next) => {
    try {

       const {name,email,password,phone,address} = req.body;

       const userExists = await User.exists({email: email});
 
       if(userExists)
       {
        throw createError(409, 'User is already exist with this email. Please sign in')
       }

       const token= createJSONWebToken({name,email,password,phone,address}, jwtKey, '10m')

       const emailData = {
        email,
        subject: 'Account Activation Email',
        html: `<h2>Hello ${name} </h2>
        <p> Please click <a href='${clientURL}/api/users/activate/${token}' target='_blank'> here </a> to activate your account </p>
        `
       }

       await emailWithNodeMailer(emailData);

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your email: ${email} for completing your registration process`,
            payload: {token}

        })

    } catch (error) {

        next(error);
    };
};



const activateUserAccount = async (req, res, next) => {
    try {
    
        const token = req.body.token;

        if(!token)
        throw createError(404, 'token not found');

        const decoded = jwt.verify(token, jwtKey);

        if(!decoded)
        throw createError(404, 'unable to verify user');

        const userExists = await User.exists({email: decoded.email});
 
       if(userExists)
       {
        throw createError(409, 'User is already exist with this email. Please sign in')
       }
       
        await User.create(decoded);
           

        return successResponse(res, {
            statusCode: 200,
            message: 'User was registered successfully',
            payload: {token}

        })

    } catch (error) {

        next(error);
    };
};



module.exports = { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount };