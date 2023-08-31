import express from 'express'
import { handleSingUp } from './controllers/loginController.js'
import { handleLogin } from './controllers/loginController.js'
import { getUser } from './utils/supabase/Users/getUser.js'


const userCrea = {names:"sabiduria",username:"hol@",password:"holalllñ"}

const app = express()

app.use(express.json())

app.post("/login", async (req,res)=>{
  // await handleLogin(userCrea,res)
//    res.send(response)
      handleLogin(req.body,res)
    
})
app.post("/singup",async (req,res)=>{
      //  pasamos los datos del usuario y el objeto reponse al 
      // manejador de registro
    handleSingUp(req.body,res)
    
})



app.listen(3000,()=>{
    console.log(" servidor on http://localhost:3000")
})