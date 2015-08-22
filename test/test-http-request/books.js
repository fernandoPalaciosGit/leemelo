;(function () {
    'use strict';
        
    var server = require('../../app'),
        testServer = require('supertest-as-promised')(server);
    
    describe('Request /book/save', function () {
        var _bookTest = {
                isbn: '123456789',
                title: 'Title book',
                description: 'Description book'
            },
            _assertBookProperties = function (book) {
                expect(book).to.have.property('isbn', '123456789');
                expect(book).to.have.property('title', 'Title book');
                expect(book).to.have.property('description', 'Description book');
                expect(book).to.have.property('id');
            };
        
        describe('[POST]', function () {
            it('Should create new book or update.', function (done) {
                testServer
                    .post('/api/book/save/')
                    .type('form')
                    .send({book: _bookTest})
                    .set('Accept', 'application/json')
                    .expect(201)
                    .then(function (res) {
                        var headerParams = res.body,
                            bookParams = headerParams.book;
                        
                        expect(headerParams).to.have.property('book');    
                        _assertBookProperties(bookParams);
                    })
                    .then(done)
                    .catch(console.log.bind(console));
            });
        });

        describe('[GET]', function () {
            it('Should retrieve an existance book.', function (done) {
                var idBook = null;
                
                // Create or update Book
                testServer
                    .post('/api/book/save/')
                    .type('form')
                    .send({book: _bookTest})
                    .set('Accept', /application\/json/)
                    .expect(201)
                    .then(function (res) {
                        idBook = res.body.book.id;
                        
                        // get The Book cerated before
                        return testServer
                            .get('/api/book/id/' + idBook)
                            .expect(200)
                            .expect('Content-Type', /application\/json/);
                    })
                    .then(function (res) {
                        var headerParams = res.body,
                            bookParams = headerParams.book;
                        
                        // Assertions ti Testing Book
                        expect(headerParams).to.have.property('book');
                        _assertBookProperties(bookParams);
                        expect(bookParams).to.have.property('id').to.equal(idBook);
                    })
                    .then(done)
                    .catch(console.log.bind(console));
            });
        });
    });
}());