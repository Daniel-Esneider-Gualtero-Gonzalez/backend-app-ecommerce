import { supabaseClient } from "../../../../CRUD/conexion.js";



export async function deleteGroup(idgroup) {

    try {
        const {error} = await  supabaseClient.from('groups').delete().eq('id',idgroup)

        if (error) throw "Error al eliminar el grupo" + error.message
        
        return true
    } catch (error) {
        return false
    }
    
}