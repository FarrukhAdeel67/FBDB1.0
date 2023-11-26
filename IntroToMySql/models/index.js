const mysql = require('mysql2');
function connection(){
 const connection =    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'enterYourPasswordHere',
        database: 'enterYourDatabaseNameHere'
    })
    return connection.promise();
}
module.exports = connection;