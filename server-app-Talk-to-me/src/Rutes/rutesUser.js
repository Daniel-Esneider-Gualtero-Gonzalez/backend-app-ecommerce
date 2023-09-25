
import {Router}  from 'express'

// midlewares devalidar props
import { validateDataAuthUser } from '../midlewares/user/userMidlewares.js'
// fin de midlewares de validar props
// Manejadores de Ruta de Usuario
import { handleLogin } from '../controllers/loginController.js'
import { handleSingUp } from '../controllers/loginController.js'
import { handleUserGroups } from '../controllers/GroupsCotroller.js'
import { handleGroupCreate } from '../controllers/GroupsCotroller.js'
//FIN FIN DE Manejadores de Ruta de Usuario



export const routerUser = Router()

routerUser.post("/login", validateDataAuthUser ,async (req,res)=>{
 handleLogin(req.body,res)
})

routerUser.post("/singup",async (req,res)=>{
    //  pasamos los datos del usuario y el objeto reponse al 
    // manejador de registro
  handleSingUp(req.body,res)
  
})


routerUser.post("/user/groups/create/", async (req,res)=>{
  if (Object.keys(req.body).length < 1) return res.status(400).json({
    "error": "Solicitud incompleta. Debe proporcionar los datos necesarios para crear el grupo."
  })

  handleGroupCreate(req.body,res)
})





routerUser.get("/user/groups/:iduser", async (req,res)=>{
  const idUser = req.params.iduser

  handleUserGroups(idUser,res)
  
})