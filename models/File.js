import mongoose from 'mongoose';
const FileSchema = new mongoose.Schema({
    path:{
        type: String,
        required: true
    },
    originalName:{
        type: String,
        required: true
    },
    password: String,
    downloadCount:{
        type: Number,
        required: true,
        default: 0
    }  
});

const File = mongoose.model('File', FileSchema);

export default File;