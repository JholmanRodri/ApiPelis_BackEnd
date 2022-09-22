import mongoose from "mongoose";
const UsuarioSchema= new mongoose.Schema({
    nombre:{type:String,maxlength:25,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    estado:{type:Number,default:1},
    imagen:{type:String},
    rol:{type:String,default:"usuario"}
    //

})

export default mongoose.model("Usuario",UsuarioSchema)