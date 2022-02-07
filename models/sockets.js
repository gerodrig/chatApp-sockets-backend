const { userConnected, getUsers, saveMessage } = require("../controllers/sockets");
const { validateClientJWT } = require("../helpers/jwt");

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        //On connection
        this.io.on('connection', async (socket) => {

            //Validate JWT
            const [ valid, uid ] = validateClientJWT( socket.handshake.query['x-token'] );

            //IF token is not valid, disconnect
            if(!valid){
            
                return socket.disconnect();
            }
            console.log('Client connected', uid);

            //Confirm what user is active with Uid
            //Call that user is connected
            await userConnected( uid, true );

            //Socket join room, uid
            //join user to a socket.io room
            socket.join(uid);


            //Emit all users that are connected
            this.io.emit('users-connected', await getUsers());

            //listen when a client sends a message/ personal message
            socket.on('personal-message', async (payload) => {
                const message = await saveMessage(payload);
                //send message to the user
                this.io.to(payload.to).emit('personal-message', message);
                //send the message to the sender
                this.io.to(payload.from).emit('personal-message', message);
            });
                

            //Disconnect save in DB that an user was disconnected
            //Emit all users that are connected.          
            socket.on('disconnect', async() => {
                this.io.emit('users-connected', await getUsers());
                await userConnected( uid );
            });
        });
    }
}

module.exports = Sockets;