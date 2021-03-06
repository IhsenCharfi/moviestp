"use strict";
var Movie = require('../models/movie');
var Actor = require('../models/actor');

module.exports = {

  getAll: function(req, res) {
    Movie.find(function(err, movies) {
      if (err) {return res.status(400).json(err);}

      res.status(200).json(movies);
    });
  },


  createOne: function(req, res) {
      var m= new Movie();
      m.id=req.body.id;
      m.title=req.body.title;
      m.year=req.body.year;
      m.save(function(err) {
          if (err)
          {return res.status(400).json(err);}

          res.status(201).json(m);
      });
  },


  getOne: function(req, res) {
    Movie.findOne({ id: req.params.id })
   // .populate('actors')
    .exec(function(err, movie) {
      if (err) {return res.status(400).json(err);}
      if (!movie) {return res.status(404).json();}

      res.status(200).json(movie);
    });
  },


  updateOne: function(req, res) {
    Movie.findOneAndUpdate({ id: req.params.id }, req.body, function(err, movie) {
      if (err) {return res.status(400).json(err);}
      if (!movie) {return res.status(404).json();}

      res.status(200).json(movie);
    });
  },


  deleteOne: function(req, res) {
    Movie.findOneAndRemove({ id: req.params.id }, function(err) {
      if (err) {return res.status(400).json(err);}

      res.status(204).json();
    });
  },


  addActor: function(req, res) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) {return res.status(400).json(err);}
      if (!movie) {return res.status(404).json();}
      try{
      Actor.findOne({ id: req.body.actors.id }, function(err, actor) {
        if (err) {return res.status(400).json(err);}
        if (!actor) {return res.status(404).json();}

        movie.actors.push(actor);
        actor.movies.push(movie);

          actor.save(function(err) {
              if (err) {return res.status(500).json(err);}


          });


        movie.save(function(err) {
          if (err) {return res.status(500).json(err);}

          res.status(201).json(movie);
        });


      });}
      catch (e)
      {
          Actor.findOne({ id: req.body.id }, function(err, actor) {
              if (err) {return res.status(400).json(err);}
              if (!actor) {return res.status(404).json();}

              movie.actors.push(actor);
              actor.movies.push(movie);

              actor.save(function(err) {
                  if (err) {return res.status(500).json(err);}


              });


              movie.save(function(err) {
                  if (err) {return res.status(500).json(err);}

                  res.status(201).json(movie);
              });


          });
      }
    });
  },


  deleteActor: function(req, res) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) {return res.status(400).json(err);}
      if (!movie) {return res.status(404).json();}

      // HACK TO CHANGE
      movie.actors = [];
      movie.save(function(err) {
        if (err) {return res.status(400).json(err);}

        res.status(204).json(movie);
      });
    });
  }

};

