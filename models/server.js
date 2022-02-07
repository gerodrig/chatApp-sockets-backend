//Express server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//connect to database
		dbConnection();

		//Http server
		this.server = http.createServer(this.app);
		//socket configurations
		this.io = socketio(this.server, {
			/*Configurations */
		});
	}

	middlewares() {
		//Deploy public directory
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		//Enable CORS
		this.app.use(cors());

		//body parser
		this.app.use(express.json());

		//API Endpoints
		this.app.use('/api/login', require('../router/auth'));
		this.app.use('/api/messages', require('../router/messages'));


	}

	configureSockets() {
		new Sockets(this.io);
	}

	execute() {
		//initialize middlewares
		this.middlewares();
		//Initialize socket
		this.configureSockets();
		//initialize server
		this.server.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
