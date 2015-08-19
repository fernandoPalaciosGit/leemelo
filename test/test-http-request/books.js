;(function () {
    'use strict';
        
    var server = require('../../app'),
        testServer = require('supertest')(server);
    
    describe('Request /book/save', function () {
            
        describe('[POST]', function () {
            
            it('Should create new book or update.', function (done) {
                var book = {
                    isbn: '123456789',
                    title: 'Title book',
                    description: 'Description book'
                };
                
                testServer
                    .post('/api/book/save/')
                    .type('form')
                    .send({book: book})
                    .set('Accept', 'application/json')
                    .expect(201)
                    .end(function (err, res) {
                        var body = res.body,
                            book = body.book;
                        
                        expect(body).to.have.property('book');
                        expect(book).to.have.property('isbn', '123456789');
                        expect(book).to.have.property('title', 'Title book');
                        expect(book).to.have.property('description', 'Description book');
                        expect(book).to.have.property('id');
                        done();
                    });
            });
        });

        describe('[GET]', function () {
            it('Should retrieve an existance book.', function (done) {
                var book = {
                        isbn: '123456789',
                        title: 'Title book',
                        description: 'Description book'
                    };
                
                testServer
                    .post('/api/book/save/')
                    .type('form')
                    .send({book: book})
                    .set('Accept', /application\/json/)
                    .expect(201)
                    .end(function (err, res) {
                        var idBook = res.body.book.id;
                        
                        testServer
                            .get('/api/book/id/' + idBook)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .end(function (err, res) {
                                var body = res.body,
                                    book = body.book;
                            
                                expect(body).to.have.property('book');
                                expect(book).to.have.property('isbn').to.equal('123456789');
                                expect(book).to.have.property('title').to.equal('Title book');
                                expect(book).to.have.property('description').to.equal('Description book');
                                expect(book).to.have.property('id').to.equal(idBook);
                                done();
                            });
                    });
            });
        });
    });
}());