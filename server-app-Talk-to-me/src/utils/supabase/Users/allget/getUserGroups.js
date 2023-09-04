import { supabaseClient } from "../../../../CRUD/conexion";


async function getUserGroups(iduser) {

    try {
        const {data,error} = await supabaseClient.from('users_groups').select('id_group').eq('user_id',iduser)
    } catch (error) {
        
    }
    
}

//  si quiero puedo crear otra funcion que me traiga todos los grupos de acuerdo 
//  a la respuesta de la consulta anterior