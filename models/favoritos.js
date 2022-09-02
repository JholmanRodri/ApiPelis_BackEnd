import mongoose from "mongoose";
const FavoritoSchema= new mongoose.Schema({
  usuario: {type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
  pelicula:{type:mongoose.Schema.ObjectId,ref:"Pelicula",required:true}
})
  
export default mongoose.model("Favorito",FavoritoSchema)