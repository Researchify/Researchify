/**
 * Tests the achievements controller
 * 
 */
 const request = require('supertest');
 const express = require('express');

 const app = express();

 app.get('/achievements/123', function(req, res) {
     res.status(200).json([{ teamId: '111', title: 'first', description: 'should be first achievement', yearAwarded: '2017' }, { teamId: '123', title: 'test1', description: 'test desc', yearAwarded: '2021' }, { teamId: '222', title: 'test2', description: 'second award', yearAwarded: '2019' }] )
 })

 describe('GET /achievements/:teamId', function() {
     it('Returns status code of 200 and json containing list of achievements for given team', function(done) {
        request(app)
        .get('/achievements/123')
        .expect('Content-Type', /json/)
        .expect(200, [{
            teamId: '111',
            title: 'first',
            description: 'should be first achievement',
            yearAwarded: '2017'
        },
            {
            teamId: '123',
            title: 'test1',
            description: 'test desc',
            yearAwarded: '2021'
        },
            {
            teamId: '222',
            title: 'test2',
            description: 'second award',
            yearAwarded: '2019' 
        }], done);
     });
 });

 describe('GET /achievements/:teamId', function() {
     it('Returns status code of 404, when teamId does not exist', function(done) {
         request(app)
         .get('/achievements/124')
         .expect(404, done)
     })
 })