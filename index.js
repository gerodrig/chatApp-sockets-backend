// Server Model: Contains express server + socket.io configured
const Server = require('./models/server');

//  library to read asnd establish env variables
require('dotenv').config();


// start server instance
const server = new Server();

// execute server
server.execute();


