## :blue_book: LEEMELO :green_book:
Web app aplication to store and read Books



#### Software design
NodeJS Backend with Express serving resources and restfull API,
MongoDB storing documents, SocketIO comunication with list of Books 
Full CPU cluster performance of server machine (launch aplication in all CPUCores)

 
 
#### Instalation
- Fork me in github :blush:
- Clone Fork into local repository
- install [mongodb](https://platzi.com/clases/node-js/concepto/nodejs-avanzado/instalacion-mongodb/material/)
- install [nodeJS](https://nodejs.org/download/)
- npm install proyect dependencies



#### deploy Application
- Open mongodb database:
```bash
$[path/to/mongodg]/mongod
```
    
- Initialize node app
```bash
$set "NODE_ENV=[development | production]" && nodemon app
```

- Run testing
```bash
$set "NODE_ENV=testing" && mocha app
```



#### Debugging
- install node packages
    - $npm install -g node-inspector [supervisor | nodemon]

- open debugger services
    - $[node | nodemon | supervisor] --debug app // PROYECT DEPLOYMENT
    - [path/to/node-inspector] --web-port=9999 // DEBUG PROYECT (where | which node-inspector)

- open browser window
    - [Open Node inspector](http://127.0.0.1:9999/?ws=127.0.0.1:9999&port=5858)
    - [Open aplication](http://localhost:3000/create-book/)

- Running *debug package* for testing tracktrace for api restfull resource
```bash
$set DEBUG=mocha:*,express:* && mocha test
```

#### Full Performance of NodeJS server workers for aplication in production environment
![nodeJs workers full performance](http://www.cruzalosdedos.es/media/nodejs-workers-app.png "NodeJS worker")



#### [API BOOK REFERENCE](https://github.com/fernandoPalaciosGit/leemelo/blob/master/documentation/api.md)



#### Software Documentation
- [NodeJS API](https://nodejs.org/api/)
- [NodeJS Framework API](http://expressjs.com/4x/api.html)
- [NOSQL API](http://mongoosejs.com/docs/index.html)
- [Testing BDD API](https://mochajs.org/)
- [Expectatives Framwork testing](http://chaijs.com/)