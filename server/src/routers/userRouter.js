const express = require('express');
const userRouter = express.Router();

const {getUsers, deleteUserById, getUserById} = require('../controllers/userController')


userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)


module.exports = {userRouter}