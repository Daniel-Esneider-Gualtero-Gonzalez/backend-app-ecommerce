import { supabaseClient } from "../../../CRUD/conexion.js";


const dataQueryUser = {coluser:'user' }


export async function getUser(nameuser) {
   
    try {
        const {coluser} =dataQueryUser
        const user = await supabaseClient.from('Users').select().eq(coluser,nameuser)
        
        if(user.error) throw new Error({error:'Error al obtener el usuario'})
        
        const response = user.data.length == 0 ? false : {...user.data[0]}

        
        return response
        
        // return response
    } catch (error) {
        
        return error
    }
}