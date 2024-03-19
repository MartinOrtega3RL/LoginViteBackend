const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'p.web_ucp',

})


module.exports = connection;