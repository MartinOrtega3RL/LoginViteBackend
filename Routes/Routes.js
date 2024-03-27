const express = require("express");
const router = express.Router();
const postUserRegister = require("../Auth/postUserRegister");
const { GetDataUser, GetUserData } = require("../Data/GetDataUser");


// Post User Register //

router.post("/postUserRegister",postUserRegister);

// Get Data User post Login //

router.post("/GetDataUser",GetDataUser);

router.get("/GetUserData", GetUserData);



module.exports =  router