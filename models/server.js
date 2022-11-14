const express = require('express');
const cors = require('cors');
const { socketControllers } = require('../socket/socket.controllers')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = { }
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.socket();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );


    }

    routes() {
        
        //this.app.use( this.paths.auth, require('../routes/auth'));
    
    }

    socket(){

        this.io.on('connection', socketControllers);
    };

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;