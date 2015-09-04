;(function () {
    'use strict';

    var _ = require('lodash'),
        server = require('../../app'),
        testServer = require('supertest-as-promised')(server);

    describe('Request /book/save', function () {
        var Test = {
                bookTest: {
                    isbn: '123456789',
                    title: 'Title book',
                    description: 'Description book'
                },
                newBook: null
            },
            _assertBookProperties = function (book) {
                expect(book).to.have.property('isbn', '123456789');
                expect(book).to.have.property('title', 'Title book');
                expect(book).to.have.property('description', 'Description book');
                expect(book).to.have.property('id');
            },
            _createNewBook = function (newbook) {
                newbook = newbook || this.bookTest;
                return testServer
                    .post('/api/book/save/')
                    .set('Accept', 'application/json')
                    .send({book: newbook})
                    .expect(201)
                    .then(function (res) {
                        var headerParams = res.body;

                        expect(headerParams).to.have.property('book');
                        this.newBook = headerParams.book;
                    }.bind(this));
                // .catch(console.error.bind(console))
            };

        beforeEach(_createNewBook.bind(Test, null));

        describe('[POST]', function () {
            it('Should create new book or update.', function (done) {
                _assertBookProperties(this.newBook);
                done();
            }.bind(Test));
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
                            book = headerParams.book;

                        // Assertions ti Testing Book
                        expect(headerParams).to.have.property('book');
                        _assertBookProperties(book);
                        expect(book).to.have.property('id').to.equal(idBook);
                    })
                    .finally(done);
            }.bind(Test));

            it('Should retrieve all book list', function (done) {
                var book = _.clone(this.bookTest);

                book.title = 'title for assert book';
                book.slug = 'slug for assert book';
                _createNewBook.call(this, null)
                .then(_createNewBook.bind(this, null))
                .then(_createNewBook.bind(this, book))
                .then(_createNewBook.bind(this, null))
                .then(function () {
                    return testServer
                        .get('/api/book-list/')
                        .expect(200)
                        .expect('Content-Type', /application\/json/);
                })
                .then(function (res) {
                    var books = res.body,
                        bookAssert = _.find(books, {title: 'title for assert book'});

                    expect(books)
                        .that.is.an('array')
                        .and.to.have.length.above(4);

                    expect(bookAssert)
                        .to.have.property('slug', 'slug for assert book');
                })
                .finally(done);
            }.bind(Test));
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
                            book = headerParams.book;

                        book.title = 'Title book for Nerds';
                        return testServer
                            .put('/api/book/id/' + idBook)
                            .send({book: book})
                            .expect(200);
                    })
                    .then(function (res) {
                        var headerParams = res.body,
                            book = headerParams.book;

                        // Assertions Testing Book
                        expect(headerParams).to.have.property('book');
                        expect(book).to.have.property('title').to.equals('Title book for Nerds');
                        expect(book).to.have.property('id').to.equal(idBook);
                    })
                    .finally(done);
            }.bind(Test));
        });

        describe('[DELETE]', function () {
            it('It should delete a book', function (done) {
                var idBook = this.newBook.id;

                // get The Book cerated before
                return testServer
                    .get('/api/book/id/' + idBook)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .then(function () {
                        // remove a book [DELETE]
                        return testServer
                            .delete('/api/book/id/' + idBook)
                            .expect(200);
                    })
                    .then(function () {
                        return testServer
                            .get('/api/book/id/' + idBook)
                            .expect(404);
                    })
                    .finally(done);
            }.bind(Test));
        });
    });
}());
