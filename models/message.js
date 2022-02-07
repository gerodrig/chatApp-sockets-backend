//import schema and model from mongoose
const {Schema, model} = require('mongoose');


const MessageSchema = new Schema({ 
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    //timestamp is automatically generated in mongoose
},{timestamps: true});

//serialize user is important to NOT use arrow functions
MessageSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});

//Export the schema
module.exports = model('Message', MessageSchema);
