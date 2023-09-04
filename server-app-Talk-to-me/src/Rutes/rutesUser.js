
import {Router}  from 'express'
// Manejadores de Ruta de Usuario
import { handleLogin } from '../controllers/loginController.js'
import { handleSingUp } from '../controllers/loginController.js'
//FIN FIN DE Manejadores de Ruta de Usuario



export const routerUser = Router()

routerUser.post("/login",async (req,res)=>{
 handleLogin(req.body,res)
})

routerUser.post("/singup",async (req,res)=>{
    //  pasamos los datos del usuario y el objeto reponse al 
    // manejador de registro
  handleSingUp(req.body,res)
  
})


routerUser.get("/user/groups/:iduser", async (req,res)=>{

  const idUser = req.params.iduser
  
})