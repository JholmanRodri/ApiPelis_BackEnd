import bcryptjs from "bcryptjs"
import Usuario from "../models/usuarios.js"
import {generarJWT} from "../middlewares/Validar-jwt.js"

const usuarioPost=async(req,res)=>{
    const {nombre,email,password,imagen}=req.body
    const salt=bcryptjs.genSaltSync(10)
    const usuario = new Usuario ({nombre,email,password,imagen})
    usuario.password=bcryptjs.hashSync(password,salt)
    await usuario.save()

    res.json({
        msg:"Registro Exitoso"
    })
}

// const usuarioLogin=async(req,res)=>{
//     let{email,password}=req.query
//     const usuarios =await Usuario.findOne({email})
//     const ValidarPasword =bcryptjs.compareSync(password,usuarios.password)
//     if (ValidarPasword)
//         res.json({"msg":"Login Exitoso"})
//     else
//         res.status(401).json({"msg":"Contraseña incorrecta"})
// }

const usuarioLogin= async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }


        if (usuario.estado === 0) {
            return res.status(400).json({
                msg: "Usuario Inactivo"
            })
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el WebMaster"
        })
    }
}

const usuarioGetListarTodos=async(req,res)=>{
    const usuarios= await Usuario.find()
    res.json({
        usuarios
    })
}

const usuarioGetListarid=async(req,res)=>{
    const {id}=req.params
    const usuario =await Usuario.findById(id)
    res.json({
        usuario
    })
}

const usuarioGetListarNombreOEmail=async(req,res)=>{
    const {valorBuscar}=req.query
    const usuarioN= await Usuario.find({$or:[
        {nombre: {$regex: valorBuscar}},
        {email: {$regex: valorBuscar}},
    ]})
}

// const usuarioPutFoto=async(req,res)=>{
//     const {id}=req.params
//     const {imagen}=req.body
//     const UsuarioEditarFoto=await Usuario.findByIdAndUpdate(id,{imagen})
//     res.json({
//         "msg":"Actualizacion realizada con exito"
//     })
// }

const usuarioPutFoto= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //pelicula a la cual pertenece la foto
        let usuarios = await Usuario.findById(id);
        //si el usuario ya tiene foto la borramos
        if (usuarios.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', usuarios.imagen);
            
            if (fs.existsSync(pathImage)) {               
                fs.unlinkSync(pathImage)
            }
        }

        usuarios = await Usuario.findByIdAndUpdate(id, { imagen: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    } 
}

const mostrarFoto= async (req, res) => {
    const { id } = req.params

    try {
        let usuario = await Usuario.findById(id)
        if (usuario.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', usuario.foto);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const usuarioPutdatos=async(req,res)=>{
    const {id}=req.params
    const {nombre,email,password}=req.body
    const salt=bcryptjs.genSaltSync(10)
    const UsuarioEditarDatos=await Usuario.findByIdAndUpdate(id,{nombre,email,password})
    UsuarioEditarDatos.password=bcryptjs.hashSync(password,salt)
    await UsuarioEditarDatos.save()
    res.json({
        "msg":'Actualizacion realizada con exito'
    })
}

// modificar model
const usuarioPutActivar=async(req,res)=>{
    const {id}=req.params
    const activar =await Usuario.findByIdAndUpdate(id,{estado:1})
    res.json({
        "msg":"Usuario activado con exito"
    })
}

const usuarioPutDesactivar=async(req,res)=>{
    const {id}=req.params
    const desactivar =await Usuario.findByIdAndUpdate(id,{estado:0})
    res.json({
        "msg":"Usuario activado con exito"
    })
}
export{usuarioPost,mostrarFoto,usuarioPutFoto,usuarioPutdatos,usuarioPutActivar,usuarioGetListarid,usuarioLogin,usuarioGetListarTodos,usuarioPutDesactivar,usuarioGetListarNombreOEmail}