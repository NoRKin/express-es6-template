import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';


/**
 * Api class
 * Expressjs server encapsulation
 * @name Api
 * @class
 *
 */
class Api {

    /**
     * Api constructor
     * Prepares the server
     *
     * @name constructor
     * @constructor
     * @access public
     * @param {number} port - Server port
     */
    constructor(port) {
        this.app = express();

        this.app.set('port', port);
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));

        this.server = http.createServer(this.app);
    }


    /**
     * Start server listening
     *
     * @name start
     * @function
     * @access public
     */
     start() {
        this.server.listen(this.app.get('port'), () => {
          console.log('Express server listening on port ' + this.app.get('port'));
        });
    }
}

class Router {
    constructor() {

    }
}


var api = new Api(process.env.PORT || 8082);
api.start();
console.log(api.server);

/*var app = express();*/
//app.set('port', process.env.PORT || 8082);
//app.use(cors());

//var server = http.createServer(app);
//server.listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
/*});*/
