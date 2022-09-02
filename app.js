import Servidor from "./models/server.js"
import 'dotenv/config'

const servidor = new Servidor
servidor.escuchar()