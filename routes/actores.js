import { Router } from "express";
import { check } from "express-validator";
import { actorEliminar, actorGet, actorGetBuscar, actorGetBuscarid, actorPost, actorPutfoto, actorPutnombre } from "../controllers/actores.js";
import HelperActores from "../helpers/actores.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/Validar-jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";

const router=Router()

router.post("/",[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 50").isLength({max:50}),
    check('observacion',"La observacion es requerida").not().isEmpty(),
    validarCampos
],actorPost)

router.get("/buscarid/:id",[
    check('id').isMongoId,
    check('id').custom(HelperActores.existeActores),
    validarCampos
],actorGetBuscarid)
   
router.get("/",actorGet)
router.get("/buscar",actorGetBuscar)

router.get("/mostrarimagen/:id",[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(HelperActores.existeActores),    
    validarCampos
])

router.put("/nombre/:id",[
    validarJWT,
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('nombre',"Debe tener menos de 50").isLength({max:50}),
    check('observacion',"La observacion es requerida").not().isEmpty(),
    check('id').isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarExistaArchivo,
    validarCampos
],actorPutnombre) 

router.put("/foto/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],actorPutfoto) 

router.delete("/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HelperActores.existeActores),
    validarCampos
],actorEliminar)
    

export default router

