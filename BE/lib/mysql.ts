import mysql from 'mysql';


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: "scart",
    user: "root",
    password: process.env.PASSWORD,
})

connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connection created with mysql successfully");
    }
})

export default connection;