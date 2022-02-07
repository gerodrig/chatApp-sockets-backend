const User = require('../models/user');
const Message = require('../models/message');

const userConnected = async ( uid, isConnected = false ) => {

    const user = await User.findById(uid);
    user.online = isConnected;

    await user.save();

    return user;

}

const getUsers = async ( req, res ) => {

    const users = await User
        .find()
        .sort('-online');
        

    return users;
}

const saveMessage = async ( payload ) => {

    try {
        const message = new Message(payload);
        await message.save();

        return message;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    userConnected,
    getUsers,
    saveMessage
}