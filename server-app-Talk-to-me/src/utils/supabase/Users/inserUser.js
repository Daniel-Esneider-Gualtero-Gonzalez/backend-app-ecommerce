import { supabaseClient } from "../../../CRUD/conexion.js";


export async function inserUser(data) {
    const {names,user}=data.data
    const {password_salt,password_hash}=data
    
    try {
        const {error}= await supabaseClient.from('Users').insert(
            {names:names,
             user:user,
             password_hash:password_hash,
             password_salt:password_salt
        })
        if(error)  throw new Error({error: 'Error al crear el usuario' });
    
        return {message:"Usuario crado exitosamente"}
    } catch (error) {
        return error
    }
}


