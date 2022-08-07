const express = require('express');
const createOne = require('../controller/user.controller');
// const userController = require('../controller/user.controller');
const userrouter = express.Router();
userrouter.route("/").post(createOne);
module.exports = userrouter;
// router.post('/signup', userController.createOne)
