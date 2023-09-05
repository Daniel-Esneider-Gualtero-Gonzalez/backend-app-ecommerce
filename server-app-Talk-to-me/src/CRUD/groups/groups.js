import { supabaseClient } from "../conexion.js";


export async function createGroup(data) {
    const {created_by,name} = data
    // Estructura final del objeto para insertar a la tabla
    const group = {created_by:created_by,name:name}

    try {
        // creamo el grupo y devolvemos el id para insertar en la tabla intermedia
        const {data,error} = await supabaseClient.from('groups').insert(group).select('id')
        
        if (error) throw new Error("error al crear el grupo")
        
        
        return  data[0].id
    } catch (error) {
        return {error:"Error al crear el grupo"}
    }
    
}