import  jwt from 'jsonwebtoken'
import { getUser } from "../utils/supabase/Users/getUser.js";
import { valiPassword } from "../utils/valiPassword.js";
import { createUser } from '../CRUD/User/user.js'
import { ValidatePropsObjet } from "../utils/midlewaresUtil.js";


export async function handleLogin(credencials, response) {


    const { password, correo } = credencials
    // si no hay una propiedad respondemos que hicieron una mala solicitud
    if (correo === undefined) return response.status(400).json({ message: "Propieda No encontrada en el cuerpo de la peticion" })
    const user = await getUser(correo)
    // si hubo un error al buscar el usuario respondemos
    if (user.error) response.status(500).json(user.error)
    // si el user esta vacio(false) respondemos
    if (!user) return response.status(401).json({ message: 'Usuario no registrado' })

    const { password_hash } = user

    const autenti = await valiPassword(password, password_hash)

    if (autenti) {
      
        //    enviamos el token con el payload del user recuperado
        let userToken = jwt.sign(user, process.env.JWTSECRET, { expiresIn: "1m" })
        return response.status(200).json({ token: userToken, message: 'Inicio de sesión exitoso' })

    } else {
        response.status(401).json({ message: 'Credenciales Invalidas' })

    }



}

export async function handleRefrestToken(req, res) {
    if (req.headers.authorization === undefined || !req.headers.authorization){
        return res.status(400).json({ error: "Invalid request", message: "Falta el token dea cceso a la solicitud" })
    } 

    const tokenBearer = req.headers.authorization.split(" ")[1]

    // nuevo token 
    let token = null

    try {
        const verifiToken = jwt.verify(tokenBearer, process.env.JWTSECRET)

        // despues utilizamos el mismo token pero eliminamos la fecha antigua de expiracion
        delete verifiToken.exp
        delete verifiToken.iat

        token = verifiToken

        // agregar un objeto con todos los roles que tenga el usuario ej: {user:true, admin:false}
       //  token["role"] = { admin: false }

    } catch (error) {
        
        return res.status(401).json({ message: "Token expired" })
    }

    
    jwt.sign(token, process.env.JWTSECRET, { expiresIn: "1d" }, (err, token) => {

        if (err) {
            return res.status(500).json({ message: "Error al Refrescar el token" })
        }

        return res.status(200).json({ token: token })

    })
}

export async function handleSingUp(data, response) {
    // Extraemos la informacion del usuario a  registrar
    const { names, lastname, correo, password } = data
    if (lastname === undefined) return response.status(400).json({ message: "Propieda No encontrada en el cuerpo de la peticion" })
    // Validamos si el usuario ya se encuentra registrado
    const exists = await getUser(correo)

    //  respuesta si el name usuario ya se encuentra registrado
    if (exists) return response.status(409).json({ message: "El nombre de Usuario ya se encuentra registrado" })
    // creamos el usuario
    const userCreate = await createUser(data)

    // validamos si hubo un error al crear el usuario y enviamos respuesta
    if (userCreate.error) response.status(500).json(userCreate.error)


    return response.status(201).json(userCreate)




}


