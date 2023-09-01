import { getUser } from "../utils/supabase/Users/getUser.js";
import { valiPassword } from "../utils/valiPassword.js";
import { createUser } from '../CRUD/User/user.js'


export async function handleLogin(credencials,response) {

    
    const {password,username}= credencials
    // si no hay una propiedad respondemos que hicieron una mala solicitud
    if (username===undefined) return response.status(400).json({message:"Propieda No encontrada en el cuerpo de la peticion"})
    const user =  await getUser(username)
    // si hubo un error al buscar el usuario respondemos
    if (user.error) response.status(500).json(user.error)
    // si el user esta vacio(false) respondemos
    if(!user) return response.status(401).json({ message: 'Usuario no registrado'})
    
    const {password_hash} = user
    
    const autenti = await valiPassword(password,password_hash)
    
    if (autenti) response.status(200).json({ message: 'Inicio de sesión exitoso' })
    else response.status(401).json({message:'Credenciales Invalidas'})
    
    

   
    
}


export async function handleSingUp(data,response) {
    // Extraemos la informacion del usuario a  registrar
    const {names,user,password} = data
    if (user===undefined) return response.status(400).json({message:"Propieda No encontrada en el cuerpo de la peticion"})
    // Validamos si el usuario ya se encuentra registrado
    const exists = await getUser(user)
    
    //  respuesta si el name usuario ya se encuentra registrado
    if (exists) return response.status(409).json({message:"El nombre de Usuario ya se encuentra registrado"})
    // creamos el usuario
    const userCreate = await createUser(data)

    // validamos si hubo un error al crear el usuario y enviamos respuesta
    if (userCreate.error) response.status(500).json(userCreate.error)
    

    return response.status(201).json(userCreate)
        
    


}


