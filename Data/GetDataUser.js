const axios = require("axios");
require('dotenv').config();

const auth0TokenUrl = "https://testerun.us.auth0.com/oauth/token"; // Reemplaza con tu dominio de Auth0
const ClientId = process.env.CLIENTID;
const ClientSecret = process.env.CLIENTSECRET;

let userData = {}; // Variable para almacenar los datos del usuario temporalmente

const GetDataUser = async (req, res) => {
  const { Email, Contraseña } = req.body;

  try {
    const response = await axios.post(auth0TokenUrl, {
      grant_type: "password",
      username: Email,
      password: Contraseña,
      client_id: ClientId,
      client_secret: ClientSecret,
      audience: "https://testerun.us.auth0.com/userinfo", // Cambia el audience a /userinfo
      scope: "openid profile email" // Añade el alcance openid
    });
    
   const accessToken = response.data.access_token;
    axios
      .get("https://testerun.us.auth0.com/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        // Los datos del usuario se encuentran en la respuesta
        userData = response.data; // Guardamos los datos del usuario en la variable userData
        res.json("Enviado")
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.json(error);
    //res.status(500).json({ error: 'Error al obtener el token de acceso' });
    console.log("Sus credenciales de ingreso son incorrectas");
  }
};

const GetUserData = (req, res) => {
  res.json(userData);
};

module.exports = {GetDataUser,GetUserData};
