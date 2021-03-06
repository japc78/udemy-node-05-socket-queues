const express = require('express')
const cors = require('cors');
const io = require('socket.io');
const http = require('http');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = io(this.server);

        this.middleWares();

        this.socketsEvents();
    }

    middleWares() {
        // Cors
        this.app.use( cors());

        // Public path
        this.app.use(express.static('public'));
    }

    socketsEvents(){
        this.io.on('connection', socketController );
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        })
    }
}

module.exports = Server;