import mongoose from "mongoose"

const bdconectar= async()=>{
    try {
        await mongoose.connect(process.env.MONGOBD_CNX);
        console.log("Base de datos online");
    } catch (error) {
        throw new Error("Error al iniciar la base de datos")
    }
    
}
export {bdconectar}