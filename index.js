const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Database Connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_db'
});

con.connect(function (error) {
    if(error) {
        console.log('Database connection faild');
    }
    else{
        console.log("Connected!");
        
    }
    // con.query("CREATE DATABASE mydb", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    // });
});


app.get('/', (req, res) => {
    res.send('Coding Task server is running');
});

app.listen(port, () => {
    console.log(`Coding task server is running on port ${port}`);
});
