import Pelicula from "../models/peliculas.js"

const HelpersPeliculas ={
    existePeliculaById:async (id)=>{
        const existe = await Pelicula.findById(id)
        if (! existe)
        throw new Error(`El id de la pelicula no existe ${id}`)
    },
    existePeliculaPorTitulo:async(titulo)=>{
        const existe =await Pelicula.findById(titulo)
        if(! existe) throw new Error("Pelicula no existe")
    },
}

export default HelpersPeliculas;

