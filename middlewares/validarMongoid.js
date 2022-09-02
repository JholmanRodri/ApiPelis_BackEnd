import mongoose from "mongoose";
import HelpersPeliculas from "../helpers/peliculas.js";

const validarMongoid = async (reparto) => {
  if (reparto.legth > 0) {
    for (let i = 0; i < reparto.length; i++) {
      const element = reparto[i];
      const isValid = mongoose.Types.ObjectId.isValid(element.idActor);
      if (!isValid) {
        throw new Error("Id de Actor no valido");
      }
      const a=await HelpersPeliculas.existePeliculaById(element)//toca crear un helper para actores
      if (a) {
        throw new Error("Id no valido");
    }
  }
}};

const validarid = async (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("Id no valido");
  }
};

export { validarMongoid, validarid };

