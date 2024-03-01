import { supabaseClient } from "../../../../CRUD/conexion.js";


export async function getUserGroups(iduser) {

    try {
        const {data,error} = await supabaseClient.from('users_groups').select('group_id').eq('user_id',iduser)
        if (error) throw new Error({error:"No se pudo obtener los grupos"})
       
        
        return data

    } catch (error) {
        // {error:"No se pudo obtener los grupos"}
        return {error:"No se pudo obtener los grupos"}
    }
    
}


export async function getGroups(lisgroups) {
    
    try {
        const {data,error} = await supabaseClient.from("groups").select('*').in('id',lisgroups)
        if (error) throw new Error({message:"Error al obtener los grupos"})
        
        return data
        
    } catch (error) {
        return {message:"Error al obtener los grupos"}
    }
    
}
//  si quiero puedo crear otra funcion que me traiga todos los grupos de acuerdo 
//  a la respuesta de la consulta anterior