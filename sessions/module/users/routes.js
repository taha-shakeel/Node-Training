const express = require('express')
const UserRouter = express.Router()
const userController = require('./controller');

UserRouter.get('/', userController.getUsers);
UserRouter.post('/create', userController.createNewUser);
UserRouter.put('/update/:updateId', userController.updateUser);
UserRouter.delete('/delete/:deleteId', userController.deleteUser);

module.exports = UserRouter