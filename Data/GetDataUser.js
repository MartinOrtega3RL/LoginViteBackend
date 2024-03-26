const axios = require("axios");

const auth0TokenUrl = "https://testerun.us.auth0.com/oauth/token"; // Reemplaza con tu dominio de Auth0
const ClientId = "";
const ClientSecret = "";

const GetDataUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(auth0TokenUrl, {
      grant_type: "password",
      username: email,
      password: password,
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
        const userData = response.data;
        res.json(userData); // Devuelve los datos del usuario como respuesta
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

module.exports = GetDataUser;
