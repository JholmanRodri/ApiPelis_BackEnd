import { Router } from "express";
import { check } from "express-validator";
import { PeliculasGet, PeliculaPost, PeliculaGetBuscar,PeliculaGetBuscarGenero,PeliculaPut, PeliculaPutFoto, PeliculaGetBuscarId, peliculaEliminar, usuarioGetActoresPelicula, mostrarImagen} from "../controllers/peliculas.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/Validar-jwt.js";
import {validarid , validarMongoid} from "../middlewares/validarMongoid.js"
import validarExistaArchivo from "../middlewares/validar_file.js";
import HelpersPeliculas from "../helpers/peliculas.js"

const router=Router()

router.post("/",[
    validarJWT,
    check('titulo',"El titulo es obligatoro").not().isEmpty(),
    check('titulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('subtitulo',"El subtitulo es obligatoro").not().isEmpty(),
    check('subtitulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('genero',"El genero es obligatoro").not().isEmpty(),
    check('genero',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('descripcion',"La descripcion es Obligatoria").not().isEmpty(),
    check('duracion',"Es Obligatorio").not().isEmpty(),
    check('duracion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('reparto').custom(validarMongoid),
    validarCampos
],PeliculaPost);

//Mostrar imagen 
router.get("/mostrar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarCampos
],mostrarImagen)

router.put('/editar/:id',[
    validarJWT,
    check('id').isMongoId(),
    check('titulo',"El titulo es obligatoro").not().isEmpty(),
    check('titulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('subtitulo',"El subtitulo es obligatoro").not().isEmpty(),
    check('subtitulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('genero',"El genero es obligatoro").not().isEmpty(),
    check('genero',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('descripcion',"La descripcion es Obligatoria").not().isEmpty(),
    check('duracion',"Es Obligatorio").not().isEmpty(),
    check('duracion',"Debe tener menos de 50 caracteres").isLength({max:50}),
    check('reparto').custom(validarMongoid),
    validarCampos
],PeliculaPut)

router.get("/",PeliculasGet)

router.put('/foto/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],PeliculaPutFoto)

router.get("/genero",[
    check('genero',"El genero es obligatorio").not().isEmpty(),
    validarCampos
],PeliculaGetBuscarGenero)

router.get("/buscar",[
    check('titulo',"El titulo es obligatorio").not().isEmpty(),
    validarCampos
],PeliculaGetBuscar);

router.get("/buscarid/:id",[
    check('id').isMongoId(),
    validarCampos
],usuarioGetActoresPelicula)


router.get("/buscar",[
    check('titulo',"El titulo es obligatorio")
],PeliculaGetBuscar)

router.get("/pelicula/:id",[
    check('id').custom(validarid),
    validarCampos
],PeliculaGetBuscarId)
    
router.delete("/borar/:id",[
    validarJWT,
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    check('id').isMongoId(),
    validarCampos
],peliculaEliminar)


export default router;
