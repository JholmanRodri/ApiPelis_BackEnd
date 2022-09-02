import Servidor from "./models/Server.js"
import 'dotenv/config'

const servidor = new Servidor
servidor.escuchar()