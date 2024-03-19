const express = require("express");
const router = express.Router();
const postUserRegister = require("../Auth/postUserRegister");


// Post User Register //

router.post("/postUserRegister",postUserRegister);


module.exports =  router