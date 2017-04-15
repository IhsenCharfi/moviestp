"use strict";
var express = require('express');
var app     = express();
require('./db')(app);
require('./parser')(app);
var actors = require('../routes/actors');
var movies = require('../routes/movies');


app.get('/', function (req, res) {
  res.render('index', { title: 'Home', message: 'Welcome to our Movies Platform!' });
});

//actor routes

app.route('/actors')
.get(actors.getAll)
.post(actors.createOne);

app.route('/actors/:id')
.get(actors.getOne)
.put(actors.updateOne)
.delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies', actors.deleteMovie);


//movie routes

app.route('/movies')
.get(movies.getAll)
.post(movies.createOne);

app.route('/movies/:id')
.get(movies.getOne)
.put(movies.updateOne)
.delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/actors', movies.deleteActor);


module.exports = app;
