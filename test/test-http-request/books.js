;(function () {
    'use strict';
        
    var server = require('../../app'),
        testServer = require('supertest')(server);
    
    describe('Request /book/save', function () {
            
        describe('[POST]', function () {
            
            it('Should create new book or update', function (done) {
                var data = {
                    book: {
                        isbn: '123456789',
                        title: 'Title book',
                        description: 'description book'
                    }  
                };
                
                data = JSON.stringify(data);
                testServer
                    .post('/book/save')
                    .set('Accept', 'application/json')
                    .send(data)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(function (err, res) {
                        var body = res.body,
                            book = body.book;
                        
                        expect(body).to.have.property('book');
                        expect(book).to.have.property('isbn', '123456789');
                        expect(book).to.have.property('title', 'Title book');
                        expect(book).to.have.property('description', 'description book');
                        done();
                    });
            });
        });
    });
}());