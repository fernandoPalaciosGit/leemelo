;(function () {
    'use strict';
        
    var _ = require('lodash'),
        server = require('../../app'),
        testServer = require('supertest-as-promised')(server);
    
    describe('Request /book/save', function () {
        var _bookTest = {
                book: {
                    isbn: '123456789',
                    title: 'Title book',
                    description: 'Description book'
                }
            },
            _assertBookProperties = function (book) {
                expect(book).to.have.property('isbn', '123456789');
                expect(book).to.have.property('title', 'Title book');
                expect(book).to.have.property('description', 'Description book');
                expect(book).to.have.property('id');
            },
            _createNewBook = function (book) {
                return testServer
                    .post('/api/book/save/')
                    .set('Accept', 'application/json')
                    .send(book)
                    .expect(201)
                    .then(function (res) {
                        var headerParams = res.body;
                        
                        expect(headerParams).to.have.property('book');
                        this.newBook = headerParams.book;
                    }.bind(this));
            };
        
        beforeEach(_createNewBook.bind(this, _bookTest));
        
        describe('[POST]', function () {
            it('Should create new book or update.', function (done) {
                _assertBookProperties(this.newBook);
                done();
            });
        });

        describe('[GET]', function () {
            it('Should retrieve an existance book.', function (done) {
                var idBook = this.newBook.id;
                
                // get The Book cerated before
                return testServer
                    .get('/api/book/id/' + idBook)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                .then(function (res) {
                    var headerParams = res.body,
                        bookParams = headerParams.book;
                    
                    // Assertions ti Testing Book
                    expect(headerParams).to.have.property('book');
                    _assertBookProperties(bookParams);
                    expect(bookParams).to.have.property('id').to.equal(idBook);
                })
                .finally(done);
            });
            
            it('Should retrieve all book list', function (done) {
                var book = _.clone(_bookTest);
                
                book.title = 'assert book';
                book.slug = 'slug for assert book';
                _createNewBook.call(this, _bookTest)
                .then(_createNewBook.bind(this, _bookTest))
                .then(_createNewBook.bind(this, book))
                .then(_createNewBook.bind(this, _bookTest))
                .then(function () {
                    return testServer
                        .get('/api/books/')
                        .expect(200)
                        .expect('Content-Type', /application\/json/);
                })
                .then(function (res) {
                    var body = res.body,
                        bookAssert = _.find(body, {title: 'testing all books'});
                         
                    expect(body)
                        .to.have.property('books')
                        .that.is.an('array')
                        .and.to.have.length.above(4);
                    
                    expect(bookAssert)
                        .to.have.property('slug', 'slug for assert book');
                })
                .finally(done);
            });
        });

        describe('[PUT]', function () {
            it('It shold update stored Book.', function (done) {
                var idBook = this.newBook.id;
                
                // get The Book cerated before
                return testServer
                    .get('/api/book/id/' + idBook)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                .then(function (res) {
                    var headerParams = res.body,
                        bookParams = headerParams.book;
                    
                    bookParams.title = 'Title book for Nerds';
                    return testServer
                        .put('/api/book/id/' + idBook)
                        .send({book: bookParams})
                        .expect(200);
                })
                .then(function (res) {
                    var headerParams = res.body,
                        bookParams = headerParams.book;
                    
                    // Assertions Testing Book
                    expect(headerParams).to.have.property('book');
                    expect(bookParams).to.have.property('title').to.equals('Title book for Nerds');
                    expect(bookParams).to.have.property('id').to.equal(idBook);
                })
                .finally(done);
            });
        });

        describe('[DELETE]', function () {
            it('It should delete a book', function (done) {
                 var idBook = this.newBook.id;
                
                // get The Book cerated before
                return testServer
                    .get('/api/book/id/' + idBook)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                .then(function (res) {
                    var headerParams = res.body,
                        bookParams = headerParams.book;
                    
                    bookParams.title = 'Title book for Nerds';
                    // remove a book [DELETE]
                    return testServer
                        .delete('/api/book/id/' + idBook)
                        .expect(200);    
                })
                .then(function () {
                    testServer
                        .get('/api/book/id/' + idBook)
                        .expect(404);
                })
                .finally(done)
                .catch(console.error.bind(console));
            });
        });
    });
}());