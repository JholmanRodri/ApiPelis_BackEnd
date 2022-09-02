import { Router } from "express";
import { check } from "express-validator";
import { favoritoDelete, favoritoGet,favListarU,favoritoGetBuscarid, favoritoGetComentarioUsuario, favoritoPeliTitulo, favoritoPost } from "../controllers/favoritos.js";
import HerlpersUsuario from "../helpers/usuarios.js";
import HelpersPeliculas from "../helpers/peliculas.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/Validar-jwt.js";
import HelpersFavoritos from "../helpers/favoritos.js";

const router=Router()

router.post("/",[
    validarJWT,
    check('usuario',"El nombre es obligatoro").not().isEmpty(),
    check('usuario',"El id del usuario no existe en la base de datos").isMongoId(),
    check('usuario').custom(HerlpersUsuario.existeUsuarioById),
    check('pelicula',"La pelicula es obligatoria").not().isEmpty(),
    check('pelicula',"El id de la pelicula no existe en la base de datos").isMongoId(),
    check('pelicula').custom(HelpersPeliculas.existePeliculaById),
    check('favorito'),
    validarCampos
],favoritoPost)

router.get("/",[
    validarJWT,
],favoritoGet)

router.get("/buscarporid/:id",[
    check('id').isMongoId(),
    check('id').custom(HelpersFavoritos.existeFavorito),
    validarCampos
],favoritoGetBuscarid)

router.get("/buscarPortitulo/",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaPorTitulo),
    validarCampos
],favoritoPeliTitulo)

router.get("/favUsuario/:id",[  
    validarJWT,
],favListarU)

router.get("/titulo",[
    validarJWT,
    check('titulo').not().isEmpty(),
    validarCampos
],favoritoPeliTitulo)

router.delete("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelpersFavoritos.existeFavorito),
    validarCampos
],favoritoDelete)   

export default router;

