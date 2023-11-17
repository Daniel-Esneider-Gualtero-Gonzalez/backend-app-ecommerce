import { supabaseClient } from "../../../CRUD/conexion.js";


const dataQueryUser = {colcorreo:'correo' }

// trae al usuario con el correo que proporcionen
export async function getUser(correo) {
   
    try {
        const {colcorreo} =dataQueryUser
        const user = await supabaseClient.from('Users').select().eq(colcorreo,correo)
        
        if(user.error) throw new Error({error:'Error al obtener el usuario'})
        
        const response = user.data.length == 0 ? false : {...user.data[0]}

        
        
        return response
        
        // return response
    } catch (error) {
        
        return error
    }
}

// D:\backend-app-talk-to-me\server-app-Talk-to-me\src\utils\supabase\Users\getUser.js