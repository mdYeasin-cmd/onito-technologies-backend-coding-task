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
    if (error) {
        console.log('Database connection faild');
    }
    else {
        console.log("Connected!");

        app.get('/api/v1/longest-duration-movies', (req, res) => {
            const longestDurationMovies = "SELECT tconst, primaryTitle, runtimeMinutes, genres FROM movies ORDER BY (runtimeMinutes) DESC LIMIT 5";

            con.query(longestDurationMovies, function (err, result) {
                if (err) throw err;
                res.send(result);
            });

        });

    }

});


app.get('/', (req, res) => {
    res.send('Coding Task server is running');
});

app.listen(port, () => {
    console.log(`Coding task server is running on port ${port}`);
});
