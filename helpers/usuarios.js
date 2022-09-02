import Usuario from "../models/usuarios.js";

const HerlpersUsuario = {
  existeEmail: async (email) => {
    if (email) {
      const existe = await Usuario.findOne({ email });
      if (existe) throw new Error("Email ya existe en la bd");
    }
  },

  existeUsuarioById: async (id) => {
    const existe = await Usuario.findById(id)
    if (!existe) {
      throw new Error(`El id no existe ${id}`)
    }
  },
  noexisteEmail:async(email)=>{
    if(email){
        const existe=await Usuario.findOne({email})
        if(!existe) throw new Error("Correo no existe Base de datos")
    }
  }
}

export default HerlpersUsuario;
