## API RESTFULL SPECIFICATION


#### Methods HTTP Supported
| Method        | Description                     |
| ------------- |:-------------------------------:|
| *GET*         | retreave one or more resources  |
| *POST*        | create one resource             |
| *PUT*         | Updarte one resource            |
| *DELETE*      | Remove one resource             |

*BOOKS*
url: '/book/add/',
url: '/book/save/',
url: '/book/isbn/:isbn',
url: '/book/edit/:bookName',
url: '/book/list/',
--------

#### HTTP code supported
| Response Code | Description                                                      |
| ------------- |:----------------------------------------------------------------:|
| *200*         | Success by GET, retrieve resource                                |
| *201*         | Success by POST, created new resource                            |
| *204*         | Success by POST / GET, no resource match                         |
| *400*         | Bad request, cannot evaluate the request                         |
| *401*         | Refuse request, User unauthorized                                |
| *404*         | Not found in server the resource requested                       |
| *422*         | Unprocessable Entity (object from our request), validation error |
| *429*         | Limit of API service exceeded, try later                         |
| *500*         | Main Error from server                                           |
| *503*         | Service not aviable, try later                                   |
--------

#### Create a New Book

Request [POST] /book

```json
{
    "book": {
        "title": "El guardian entre el centeno",
        "isbn": "456-52-B",
        "type": "thriller",
        "description": "History from a crazy guy"
    }
}
```

Response

```json
{
    "book": {
        "id": "654",
        "title": "El guardian entre el centeno",
        "isbn": "456-52-B",
        "type": "thriller",
        "description": "History from a crazy guy"
    }
}
```
-------------

#### Retreave a Book

Request [GET] /book/456

Response
``````json
{
    "book": {
        "id": "456",
        "title": "El guardian entre el centeno",
        "isbn": "456-52-B",
        "type": "thriller",
        "description": "History from a crazy guy"
    }
}
```
-------------

#### Update a Book
    
Request [PUT] /book/456

```json
{
    "book": {
        "title": "El guardian entre el centeno gold Edition",
        "isbn": "456-64-B",
        "type": "Suspence",
        "description": "History from a crazy guy"
    }
}
```

Response
```json
{
    "book": {
        "id": "456",
        "title": "El guardian entre el centeno gold Edition",
        "isbn": "456-64-B",
        "type": "Suspence",
        "description": "History from a crazy guy"
    }
}
```
-------------

#### DELETA a Book
    
Request [DELETE] /book/456

Response
```