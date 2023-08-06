const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImage } = require('../secret');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true

    },

    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
            },

            message: 'Please enter a valid email'
        }

    },

    password: {
        type: String,
        required: [true, 'User name is required'],
        minLength: [6, 'Password length should be minimum 6 characters'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },

    image: {
        type: String,
        default: defaultImage,
    },

    address: {
        type: String,
        required: [true, 'User address is required'],
    },

    phone: {
        type: String,
        required: [true, 'User phone is required'],
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    isBanned: {
        type: Boolean,
        default: false
    },



}, { timestamps: true });



const User = model('users', userSchema)

module.exports = User;