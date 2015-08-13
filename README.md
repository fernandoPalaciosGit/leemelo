## NodeJS MVC proyect Boilerplate
Simple proyect Structure with Express Backend.
 
 
 
#### Instalation
- Fork me in github :blush:
- Clone Fork into local repository
- install [mongodb](https://platzi.com/clases/node-js/concepto/nodejs-avanzado/instalacion-mongodb/material/)
- install [nodeJS](https://nodejs.org/download/)
- npm install proyect dependencies



#### deploy in Windows
- open mongodb database:
    - $[path/to/mongodg]/mongod.exe
    
- initialize node appp
    - $node [path/to/app.js]

- execute aplication in web browser
    - localhost:3000/[path/to/express-route]



#### Debugging
- *install node packages*
    - $npm install -g node-inspector [supervisor | nodemon]

- *open debugger services*
    - $[Nodemon | supervisor --debug] [path/to/app.js] // PROYECT DEPLOYMENT
    - [path/to/node-inspector] --web-port=9999 // DEBUG PROYECT (where | which node-inspector)

- *open browser window*
    - http://127.0.0.1:9999/?ws=127.0.0.1:9999&port=5858
    - localhost:3000/[path/to/express-route]


#### Documentation
- [NodeJS API](https://nodejs.org/api/)
- [Express API](http://expressjs.com/4x/api.html)
- [Mongoose API](http://mongoosejs.com/docs/index.html)