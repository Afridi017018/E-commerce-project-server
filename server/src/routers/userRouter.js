const express = require('express');
const upload = require('../controllers/middlewares/uploadFile');
const userRouter = express.Router();

const {getUsers, deleteUserById, getUserById, processRegister, activateUserAccount} = require('../controllers/userController')


userRouter.post('/process-register', upload.single('image'), processRegister)
userRouter.post('/verify',activateUserAccount)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)


module.exports = {userRouter}