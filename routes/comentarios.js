import {Router}from "express";
import { check } from "express-validator";
import {comentarioPost,comentarioGet, comentariogetBuscar, comentarioGetBuscarid, comentarioEliminar, comentarioGetComentarioUsuario, comentarioGetComentarioPelicula} from "../controllers/comentarios.js"
import HelperComentario from "../helpers/comentarios.js";
import HelpersPeliculas from "../helpers/peliculas.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/Validar-jwt.js";

const router=Router()

router.post("/",[
    validarJWT,
    check('usuario',"El nombre es obligatoro").not().isEmpty(),
    check('usuario',"El id del usuario no existe en la base de datos").isMongoId(),
    check('usuario').custom(HerlpersUsuario.existeUsuarioById),
    check('pelicula',"La pelicula es obligatoria").not().isEmpty(),
    check('pelicula',"El id de la pelicula no existe en la base de datos").isMongoId(),
    check('pelicula').custom(HelpersPeliculas.existePeliculaById),
    check('comentario',"el comentario es requerido").not().isEmpty(),
    validarCampos
],comentarioPost)

router.get("/",[
],comentarioGet)

router.get("/buscar",comentariogetBuscar)

router.get("/id/:id",[
    check('id').isMongoId(),
    check('id').custom(HelperComentario.existeComentario),
    validarCampos
],comentarioGetBuscarid)
    
router.delete("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperComentario.existeComentario),
    validarCampos
],comentarioEliminar)

router.get("/ComenUsuario/:id",[
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarCampos
],comentarioGetComentarioUsuario)

router.get("/ComenPelicula/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById),
    validarCampos
],comentarioGetComentarioPelicula)
export default router;





