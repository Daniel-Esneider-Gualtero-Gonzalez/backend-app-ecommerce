import { inserUser } from "../../utils/supabase/Users/inserUser.js";
import { genPassword } from "../../utils/passwordUtil.js";



export async function createUser(data) {
    try {
        
        const {names,user,password}=data
        const createPassword = await genPassword(password)
        if (createPassword.error) throw new Error({message:"No se puedo crear la contraseña"})
        const  createUser = await inserUser({...createPassword,data})
        
        if (createUser.error) throw new Error({error:'Errol al crear el usuario'}) 
    
    return createUser

    } catch (error) {
        return error
    }
    
}