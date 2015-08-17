;(function () {
    'use strict';
        
    var testServer = require('supertest'),
        server = require('../../app');
    
    describe('Request [POST] /book/save', function () {
        it('should create new book or update, with new ID.', function () {
            var book = {
                    isbn: '987-897-P',
                    title: 'Cardamomo',
                    description: 'More helpfull spice'
                };
            
            describe('Response', function () {
                it('should return saved book with new ID', function () {
                    
                    testServer(server)
                        .post('/book/save')
                        .set('Accept', 'application/json')
                        .send(book)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
                        .end(function (err, res) {
                            var body = res.body;
                            !!err && console.error(err.text);
                            expect(body).to.have.propertie('book');
                        });
                });
            });
        });
    });
}());