"use strict";
var should  = require('should');
var assert  = require('assert');
var request = require('supertest');
var app     = require('../src/lib/app');
var Actor   = require('../src/models/actor');


describe('Actors', function() {

  // cleanup the collection once to have consistent test results
  before(function(done) {
    Actor.remove({}, function(err) {
      done(err);
    });
  });


  describe('POST actor', function(){
    it('should create an actor', function(done){
      var actor = {
        'id': '4',
        'name': 'AxiomZen',
        'birth_year': '2012'
      };

      request(app)
      .post('/actors')
      .send(actor)
      .expect(201, done);
    });




      it('should not allow you to create duplicate actors', function(done) {
          var actor = {
              'id': '4',
              'name': 'AxiomZen2',
              'birth_year': '2012'
          };

          request(app)
              .post('/actors')
              .send(actor)
              .expect(400, done);
      });


      });



  describe('GET actor', function() {
    it('should retrieve actor from db', function(done){
      request(app)
      .get('/actors/4')
      .expect(200, done);
    });

    it('should respond not found when no actor exists', function(done){
      request(app)
      .get('/actors/392132')
      .expect(404, done);
    });
  });


  describe('PUT actor', function() {
    it('should edit a actor', function(done) {
      var edit = {
        'name': 'ZenAxiom',
        'birth_year': 2011
      };

      request(app)
      .put('/actors/4')
      .send(edit)
      .expect(200, done);
    });

    it('should have been edited', function(done) {
      request(app)
      .get('/actors/4')
      .expect(200)
      .end(function(err, res) {
        res.body.name.should.eql('ZenAxiom');
        res.body.birth_year.should.eql(2011);
        done();
      });
    });
  });


  describe('POST /actors/:id/movies', function() {
    it('should successfully add a movie to the actor', function(done) {
      var movie = {
        'id': '3',
        'title': 'Hello World v2.0',
        'year': 2013
      };
      request(app)
      .post('/movies')
      .send(movie)
      .expect(201)
      .end(function() {
        request(app)
        .post('/actors/4/movies')
        .send(movie)
        .expect(201, done);
      });
    });

    it('actor should have array of movies now', function(done){
      request(app)
      .get('/actors/4')
      .expect(200)
      .end(function(err, res) {
        res.body.movies.length.should.eql(1);
        res.body.movies[0].id.should.eql(3);
        done();
      });
    });
  });

  describe('DELETE /actors/:id/movies', function() {
    it('should successfully remove all movies from actor', function(done){
      request(app)
      .delete('/actors/4/movies')
      .expect(204, done);
    });

    it('actor should no longer have that movie id', function(done){
      request(app)
      .get('/actors/4')
      .expect(201)
      .end(function(err, res) {
        res.body.movies.length.should.eql(0);
        done();
      });
    });
  });


  describe('DELETE actor', function() {
    it('should remove an actor', function(done) {
      request(app)
      .delete('/actors/4')
      .expect(204, done);
    });
  });


});
