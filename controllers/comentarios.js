import Comentario from "../models/comentarios.js"

const comentarioPost=async(req,res)=>{
    const {usuario,pelicula,comentario}=req.body
    const comentarios=new Comentario({usuario,pelicula,comentario}) 
    await comentarios.save()
    res.json({
        "msg":"Comentario realizado con éxito!",comentarios
    })
}

const comentarioPut=async(req,res)=>{
    const {id}=req.params
    const {comentario}= req.body
    const comentarios=await Comentario.findByIdAndUpdate(id,{comentario})
    res.json({
        comentarios
    })
}
// lista todos y muestra con el populate los nombres de usuario y pelicula💘
const comentarioGet=async(req,res)=>{
    const comentarios=await Comentario.find()
    .populate("usuario","nombre")
    .populate("pelicula","titulo")
    res.json({
        comentarios
    })
}

const comentariogetBuscar=async(req,res)=>{
    const {comentarios}=req.query
    const comen = await Comentario.find({comentarios})
    res.json({
        comen
    })
}

//todos los comentarios de un usuario
const comentarioGetComentarioUsuario=async(req, res)=>{
    const {id}=req.params;
    const comen = await Comentario.find().where('usuario').in(id).exec();
    res.json({
        comen
    })
}

//todos los comentarios de una pelicula
const comentarioGetComentarioPelicula=async(req, res)=>{
    const {id}=req.params;
    const comen = await Comentario.find().populate("usuario",["nombre"])
    .where('pelicula').in(id).exec()
    
    res.json({
        comen
    })
}

const comentarioGetBuscarid=async(req,res)=>{
    const {id}=req.params
    const comen=await Comentario.findById(id)
    res.json({
        comen
    })
}

const comentarioEliminar=async(req,res)=>{
    const{id}=req.params
    const comen= await Comentario.findByIdAndDelete(id)
    res.json({"eliminado":comen})
}

const buscarComentario=async(req, res)=>{
    const {comentarioo}=req.query;
    const comentario=await Comentario.find({comentario})
    res.json({comentario})
}

export {comentarioPost,buscarComentario,comentarioGetComentarioUsuario,comentarioGetComentarioPelicula,comentarioPut,comentarioGet,comentariogetBuscar,comentarioGetBuscarid,comentarioEliminar}