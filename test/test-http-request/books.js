;(function () {
    'use strict';
        
    var testServer = require('supertest'),
        api = require('../../workers/slave.worker.js'),
        request = testServer(api);
    
    describe('Request [POST] /book/save', function () {
        it('should create new book or update, with new ID.', function () {
            var book = {
                    isbn: '987-897-P',
                    title: 'Cardamomo',
                    description: 'More helpfull spice'
                };
            
            describe('Response', function () {
                it('should return saved book with new ID', function () {
                    request
                    .post('/book/save')
                        .expect('Content-Type', /json/)
                        .set('Accept', 'application/json')
                        .send(book)
                        .expect(201)
                        .end(function (err, res) {
                            var body = res.body;
                            expect(body).to.have.propertie('book');
                        });
                });
            });
        });
    });
}());