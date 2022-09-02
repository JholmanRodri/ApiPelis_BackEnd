import Comentario from "../models/comentarios.js";

const HelperComentario = {
    existeComentario: async (id) => {
        const existe = await Comentario.findById(id)
        if (!existe) throw new Error("Id no existe en la base de datos")
    },
}


export default HelperComentario