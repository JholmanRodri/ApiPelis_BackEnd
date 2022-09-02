import mongoose from "mongoose";

const PeliculaSchema= new mongoose.Schema({
    titulo:{type:String,maxlength:100,required:true},
    subtitulo:{type:String,maxlength:100,required:true},
    genero:{type:String,maxlength:100,required:true},
    descripcion:{type:String,required:true},
    duracion:{type:String,maxlength:50,required:true},
    calificacion:{type:String,maxlength:10},
    imagen:{type:String},
    
    reparto:[
        {idActor:{type:mongoose.Schema.ObjectId,ref:"Actor",required:true},
        apodo:{type:String,maxlength:100,required:true},
        foto:{type:mongoose.Schema.ObjectId,ref:"Actor.foto"}
        }
    ]
})

export default mongoose.model("Pelicula",PeliculaSchema)


