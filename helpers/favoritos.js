import Favorito from "../models/favoritos.js";

const HelpersFavoritos={
    existeFavorito:async(id)=>{
        const existe =await Favorito.findById(id)
        if(! existe) throw new Error("Id no existe en la base de datos")
    },

}



export default HelpersFavoritos