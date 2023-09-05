
import { supabaseClient } from "../../../../CRUD/conexion.js";
//  modulo de utilidades para agregar el usuario a la tabla intermedia:
//  users_groups


//  inserta el usuario al grupo que creo
export async function userGroup(iduser,idgroup) {
    //objeto estructura namecolum,value  para la insercions
    const users_groups = {user_id:iduser,group_id:idgroup}
    
    try {
        const {error} = await supabaseClient.from('users_groups').insert(users_groups)
        if (error) throw new Error("Error al registrar el usuario con el grupo")
        return {message:"Grupo creado exitosamente"} 
    } catch (error) {
        return {error:"Error al registrar el usuario con el grupo"}
    }

}