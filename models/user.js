//import schema and model from mongoose
const {Schema, model} = require('mongoose');


const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

//serialize user is important to NOT use arrow functions
UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    //object uid is automatically generated in mongoose
    object.uid = _id;
    return object;
});

//Export the schema
module.exports = model('User', UserSchema);