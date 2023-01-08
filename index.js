const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Database Connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_db'
});

con.connect(function (error) {
    if (error) {
        console.log('Database connection faild!!!');
    }
    else {
        app.get('/api/v1/longest-duration-movies', (req, res) => {

            const longestDurationMovies = "SELECT tconst, primaryTitle, runtimeMinutes, genres FROM movies ORDER BY (runtimeMinutes) DESC LIMIT 10";

            con.query(longestDurationMovies, function (err, result) {
                if (err) throw err;
                res.send(result);
            });

        });

        app.post('/api/v1/new-movie', (req, res) => {

            const newMovie = req.body;

            const newMovieSQL = "INSERT INTO movies SET?"

            con.query(newMovieSQL, newMovie, function (err, results) {
                if (err) throw err;
                res.send(results);
            });

        });

        app.get('/api/v1/top-rated-movies', (req, res) => {
            
            const topRatedMoviesSQL = "SELECT movies.tconst, movies.primaryTitle, movies.genres, ratings.averageRating FROM movies, ratings WHERE ratings.averageRating > 6.0 AND movies.tconst = ratings.tconst";

            con.query(topRatedMoviesSQL, function (err, result) {
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
