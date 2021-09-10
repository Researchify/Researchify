/**
 * Tests the achievements controller
 * 
 */
 const request = require('supertest');
 const express = require('express');

 const app = express();

 app.get('/achievements/123', function(req, res) {
     res.status(200).json({ teamId: '123', title: 'test1', description: 'test desc', yearAwarded: '2021' })
 })

 describe('GET /achievements/:teamId', function() {
     it('Responds with json', function(done) {
        request(app)
        .get('/achievements/123')
        .expect('Content-Type', /json/)
        .expect(200, done);
     });
 });


 it('Testing to see if jest works', () => {
     expect(2).toBe(2)
 })
