import mongoose from "mongoose";
const ActorSchema= new mongoose.Schema({
    nombre:{type:String,maxlength:50,required:true},
    foto:{type:String},
    observacion:{type:String,required:true},
    createData:{type:Date,default:Date.now()}
}) 
export default mongoose.model("Actor",ActorSchema)
