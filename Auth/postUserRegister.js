const connection = require("../config");




const postUserRegister = (req,res) => {

    const { userId, email, emailVerified, userMetadata } = req.body;
    const nombre = userMetadata.nombre;
    const apellido = userMetadata.apellido;
    const cuil = userMetadata.cuil;
    const rol = userMetadata.rol;
    const telefono = userMetadata.telefono || "";

    const insertarDatosPersona = `INSERT INTO persona (Nombre,Apellido,Cuil,Num_Telefono,Email) VALUES (?,?,?,?,?)`
    const insertarDatosUsuario = `INSERT INTO usuario (id_Usuario,Usuario,Contraseña,Persona_id_Persona) VALUES (?,?,?,?)`
    const insertarDatosRol = `INSERT INTO rol (Descripcion,Usuario_id_Usuario) VALUES (?,?)`
    
    connection.query(insertarDatosPersona, [nombre,apellido,cuil,telefono,email],(error,results) => {
        if (error) res.send(error);
         // Obtener el ID generado
        connection.query('SELECT LAST_INSERT_ID()', (error, idResult) => {
            if (error) res.send(error);

            const personaId = idResult[0]['LAST_INSERT_ID()'];

            // Usar el ID en la siguiente consulta
            connection.query(insertarDatosUsuario, [userId,"","",personaId], (error, results) => {
                if (error) res.send(error);
                connection.query(insertarDatosRol,[rol,userId],(error,results) => {
                    if(error) res.send(error);
                    res.send(results)
                })
            });
        });
    })


}


module.exports = postUserRegister;