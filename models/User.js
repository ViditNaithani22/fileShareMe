import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    links:[{
    type: String
    }],
    uploads:{
        type: Number
    }   
});

const User = mongoose.model('User', UserSchema);

export default User;