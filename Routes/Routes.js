const express = require("express");
const router = express.Router();
const postUserRegister = require("../Auth/postUserRegister");
const GetDataUser = require("../Data/GetDataUser");


// Post User Register //

router.post("/postUserRegister",postUserRegister);

// Get Data User post Login //

router.post("/GetDataUser",GetDataUser);



module.exports =  router