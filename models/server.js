import express from "express";
import cors from "cors";
import { bdconectar } from "../database/Config.js";
import peliculas from "../routes/peliculas.js";
import usuarios from "../routes/usuarios.js";
import favoritos from "../routes/favoritos.js";
import actores from "../routes/actores.js";
import comentarios from "../routes/comentarios.js";
import fileUpload from "express-fileupload";

class Servidor {
  constructor() {
    this.app = express();
    this.middlewares();
    this.port = process.env.PORT;
    this.conectarbd();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    
    this.app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:'/tmp/',
      createParentPath:true
    }))
  }
  async conectarbd() {
    await bdconectar()
  }
 
  routes(){
      this.app.use("/api/peliculas",peliculas);
      this.app.use("/api/usuarios",usuarios);
      this.app.use("/api/favoritos",favoritos);
      this.app.use("/api/actores",actores);
      this.app.use("/api/comentarios",comentarios);
  }
  // var server = app.listen(process.env.PORT || 5000), function() {
  //   var port = server.address().port;
  //   console.log("Express is working on port " + port);
  escuchar(){
      this.app.listen(this.port,() =>{
          console.log(`Servidor escuchando por el puerto ${this.port}`);
      })
  }
}

export default Servidor;

