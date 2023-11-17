
import {Router}  from 'express'

// midlewares devalidar props
import { validateDataAuthUser } from '../midlewares/user/userMidlewares.js'
// fin de midlewares de validar props
// Manejadores de Ruta de Usuario
import { handleLogin, handleRefrestToken } from '../controllers/loginController.js'
import { handleSingUp } from '../controllers/loginController.js'
import { handleUserGroups } from '../controllers/GroupsCotroller.js'
import { handleGroupCreate } from '../controllers/GroupsCotroller.js'
import { getHandleAvatarController } from '../controllers/avatarController.js'
//FIN FIN DE Manejadores de Ruta de Usuario



export const routerUser = Router()

routerUser.post("/auth/login", validateDataAuthUser ,async (req,res)=>{
 handleLogin(req.body,res)
})
// refrest del token del usuario
routerUser.get("/auth/refrestToken/",handleRefrestToken)

routerUser.post("/singup",async (req,res)=>{
    //  pasamos los datos del usuario y el objeto reponse al 
    // manejador de registro
  handleSingUp(req.body,res)
  
})

// ruta para obtener los avatares de esta app
routerUser.get("/avatars/", getHandleAvatarController)


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