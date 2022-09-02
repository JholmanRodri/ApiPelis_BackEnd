import Actor from"../models/actores.js"
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpers/SubirArchivo.js"
import { v2 as cloudinary } from 'cloudinary'

const actorPost=async(req,res)=>{
    const {nombre,foto,observacion}=req.body 
    const actor =new Actor({nombre,foto,observacion})
    await actor.save()
    res.json({
        "msg":"registro exitoso", 
        actor
    })
}

const  actorPutfoto= async (req, res) => {
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
                    let actor = await Actor.findById(id);
                    if (actor.foto) {
                        const nombreTemp = actor.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    actor = await Actor.findByIdAndUpdate(id, { foto: result.url })
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

const cargarArchivoCloud= async(req,res)=>{
    const { id } = req.params;
        try {
            let foto
            await subirArchivo(req.files, undefined)
                .then(value => foto = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let actor = await Actor.findById(id);
            //si el usuario ya tiene foto la borramos
            if (actor.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', actor.foto);
                
                if (fs.existsSync(pathImage)) {               
                    fs.unlinkSync(pathImage)
                }
            }
            actor= await Actor.findByIdAndUpdate(id, { foto: foto })
            //responder
            res.json({ foto });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
}

const actorPutnombre= async(req,res)=>{
    const {id}=req.params
    const {nombre,observacion}=req.body
    const actorNombre =await Actor.findByIdAndUpdate(id,{nombre,observacion})
    res.json({
        "msg": `Actualizacion exitosa`
    })
}

//listar todos

const actorGet=async(req,res)=>{
    const actor =await Actor.find()
    res.json({
        actor
    })
}

//listar por nombre
const actorGetBuscar=async(req,res)=>{
    const {nombre}=req.query
    const actor=await Actor.find({nombre})
    res.json({
        actor
    })
}

// listar por id
const actorGetBuscarid=async(req,res)=>{
    const {id}=req.params
    const actor=await Actor.findById(id)
    res.json({
        actor
    })
}
const actorEliminar=async(req,res)=>{
    const{id}=req.params
    const actor= await Actor.findByIdAndDelete(id)
    res.json({"eliminado":actor})
}

export  {actorPost,actorGet,actorGetBuscar,actorGetBuscarid,actorPutfoto,actorEliminar,actorPutnombre}