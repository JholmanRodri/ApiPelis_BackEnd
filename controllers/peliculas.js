import Pelicula from "../models/peliculas.js"
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpers/SubirArchivo.js"
import { v2 as cloudinary } from 'cloudinary'

//Agregar datos a la bd
const PeliculaPost =async(req,res)=>{
    const {titulo,subtitulo,genero,descripcion,duracion,calificacion,imagen,reparto}=req.body
    const pelicula= new Pelicula ({titulo,subtitulo,genero,descripcion,duracion,calificacion,imagen,reparto})
    await pelicula.save()

    res.json({
        "msg":"Registro exitoso",
        pelicula
    })
}

//editar datos pelicula
const PeliculaPut=async(req,res)=>{
    const {id}=req.params
    const {titulo,subtitulo,genero,descripcion,duracion,reparto}=req.body
    const PeliculaEditar=await Pelicula.findByIdAndUpdate(id,{titulo,subtitulo,genero,descripcion,duracion,reparto})
    res.json({
        "msg":'Actualizacion realizada con exito',
        PeliculaEditar
    })
}


//editar foto
// const PeliculaPutFoto=async(req,res)=>{
//     const {id}=req.params
//     const {imagen}=req.body
//     const PeliculaEditarFoto=await Pelicula.findByIdAndUpdate(id,{imagen})
//     res.json({
//         "msg":'Actualizacion realizada con exito'
//     })
// }

const  PeliculaPutFoto= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {   
                    let pelicula = await Pelicula.findById(id);
                    if (pelicula.imagen) {
                        const nombreTemp = pelicula.imagen.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    pelicula = await Pelicula.findByIdAndUpdate(id, { imagen: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const PeliculaPutFotovieja= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //pelicula a la cual pertenece la foto
        let peliculas = await Pelicula.findById(id);
        //si el usuario ya tiene foto la borramos
        if (peliculas.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peliculas.imagen);
            
            if (fs.existsSync(pathImage)) {               
                fs.unlinkSync(pathImage)
            }
        }

        peliculas = await Pelicula.findByIdAndUpdate(id, { imagen: nombre })
        //responder
        res.json({ peliculas });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    } 
}

//listar todas las peliculas
const PeliculasGet= async(req,res)=>{
    const peliculas=await Pelicula.find()
    .populate("reparto.idActor",["nombre","foto","observacion"])
    res.json({
        peliculas
    })
}

//listar todas las peliculas en las que ha estado el actor(idactor)
const usuarioGetActoresPelicula=async(req, res)=>{
    const {id}=req.params;
    const peliculas = await Pelicula.find().where('reparto.idActor').in(id).exec();
    res.json({
        peliculas
    })
}

const PeliculaGetBuscarGenero=async(req,res)=>{
    const {genero}=req.query
    const peliculas=await Pelicula.find({genero})
    res.json({
        peliculas
    })
}

//listar por titulo
const PeliculaGetBuscar=async(req,res)=>{
    const {titulo}=req.query
    const pelicula = await Pelicula.find(
        //{nombre:new RegExp(query,"i")}
        
        {
            $or: [
                //Viene del modelo // viene de query
                { titulo: new RegExp(titulo, "i") },
            ]
        }
    ) 
    res.json({pelicula})
}

//mostrar imagen
const mostrarImagen= async (req, res) => {
    const { id } = req.params
    try {
        let peliculas = await Pelicula.findById(id)
        if (peliculas.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peliculas.imagen);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const cargarArchivoCloud= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let pelicula = await Pelicula.findById(id);
                    if (pelicula.imagen) {
                        const nombreTemp = pelicula.imagen.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    pelicula = await Pelicula.findByIdAndUpdate(id, { imagen: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}

const PeliculaGetBuscarId=async(req,res)=>{
    const {id}=req.params
    const peliculas=await Pelicula.findById(id)
    res.json({
        peliculas
    })
}

const peliculaEliminar=async(req,res)=>{
    const{id}=req.params
    const pelicula=await Pelicula.findByIdAndDelete(id)
    res.json({"eliminado":pelicula})
}
// const PeliculaGetBuscar=async(req,res)=>{
//     const {email}
// }
export {PeliculaPost,cargarArchivoCloud,PeliculasGet,PeliculaGetBuscarGenero,mostrarImagen,usuarioGetActoresPelicula,PeliculaGetBuscar,PeliculaPutFoto,PeliculaGetBuscarId,peliculaEliminar,PeliculaPut}