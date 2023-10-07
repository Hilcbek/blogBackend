import mongoose from 'mongoose';
let { model, Schema }= mongoose;
let PostSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    postImage : {
        type : String,
        required : true
    },
    userName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, { timestamps : true })
export default model('Post',PostSchema);