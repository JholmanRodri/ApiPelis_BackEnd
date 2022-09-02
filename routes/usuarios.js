import {Router} from "express"
import {mostrarFoto, usuarioGetListarid, usuarioGetListarNombreOEmail, usuarioGetListarTodos, usuarioLogin,usuarioPost, usuarioPutActivar, usuarioPutdatos, usuarioPutDesactivar, usuarioPutFoto,} from "../controllers/usuarios.js"
import { check } from "express-validator";
import HerlpersUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/Validar-jwt.js";
import validarExistaArchivo from "../middlewares/validar_file.js";

const router=Router()
router.post("/",[
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 6 caracteres").isLength({min:6}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HerlpersUsuario.existeEmail),
    validarCampos,
],usuarioPost);

router.post("/login",[
    check('email').custom(HerlpersUsuario.noexisteEmail),
    check('email',"No es un email valido").isEmail(),
    validarCampos
],usuarioLogin) 

router.get("/",usuarioGetListarTodos)

router.get("/listar/:id",[
    check('id').isMongoId(),
    validarCampos
],usuarioGetListarid)

router.get("/Nombreoemail/:id",[
    check('id').isMongoId(),
    validarCampos
],usuarioGetListarNombreOEmail)

router.put("/foto/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    validarExistaArchivo,
    validarCampos
],usuarioPutFoto)

router.put("/datos/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById),
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 6 caracteres").isLength({min:6}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(HerlpersUsuario.existeEmail),
    validarCampos
],usuarioPutdatos)

router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],usuarioPutActivar)

router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HerlpersUsuario.existeUsuarioById), 
    validarCampos   
],mostrarFoto)

router.put("/desactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],usuarioPutDesactivar)
export default router;

