import mysql from 'mysql';


const connection = mysql.createConnection({
    host: "localhost",
    user: "yassg4mer",
    password: "1234567890",
    database: "test"
})

export default connection;