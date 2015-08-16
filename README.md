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
- open mongodb database:
    - $[path/to/mongodg]/mongod.exe
    
- initialize node appp
    - $node [path/to/app.js]

- execute aplication in web browser
    - localhost:3000/[path/to/express-route]



#### Debugging
- install node packages
    - $npm install -g node-inspector [supervisor | nodemon]

- open debugger services
    - $[node | nodemon | supervisor] --debug [path/to/app.js] // PROYECT DEPLOYMENT
    - [path/to/node-inspector] --web-port=9999 // DEBUG PROYECT (where | which node-inspector)

- open browser window
    - http://127.0.0.1:9999/?ws=127.0.0.1:9999&port=5858
    - localhost:3000/[path/to/express-route]



#### Full Performance of NodeJS server workers for aplication
![nodeJs workers full performance](http://www.cruzalosdedos.es/media/nodejs-workers-app.png "NodeJS worker")



###

#### Software Documentation
- [NodeJS API](https://nodejs.org/api/)
- [NodeJS Framework API](http://expressjs.com/4x/api.html)
- [NOSQL API](http://mongoosejs.com/docs/index.html)
- [Testing BDD API](https://mochajs.org/)
- [Expectatives Framwork testing](http://chaijs.com/)