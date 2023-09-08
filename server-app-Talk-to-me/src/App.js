import {createServer} from 'http'
import {Server} from 'socket.io'
import express from 'express'

// importaciones de routers
import { routerUser } from './Rutes/rutesUser.js'
import { routerPosters } from './Rutes/rutesPosters.js'
// fin de importaciones de routers



//  crear dirname ya que no esta en los modulos ecmascript 

import { fileURLToPath } from 'url';
import path from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//  fin de la crear dirname ya que no esta en los modulos ecmascript 


const userCrea = {names:"sabiduria",username:"hol@",password:"holalllñ"}

 
 const app = express() // se encarga de manejar rutas midlewares y demas que llegan al host server
 
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Habilita CORS para todos los orígenes
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeceras permitidas
  // ...

  // Continúa con el siguiente middleware o ruta
  next();
});

 const serverHttp = createServer(app) // maneja las conexiones crea el host 
 
 export const ioSocket = new Server(serverHttp,{
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 *1000 ,
    skipMiddlewares : true,
  },
  cors:{
    origin:'http://127.0.0.1:5173'  // habilitamos las cors para que puedan conectarse
  }
 })

 

//  APLICACION EXPRESS

app.use(express.json())

// todas la rutas que tenga que ver con el usuario
app.use(routerUser)

// todas las rutas de posters
app.use(routerPosters)



app.get("/chat",(req,res)=>{

   // se puedde responder tambien cuando hagan peticiones http
  ioSocket.emit("request",{message:"hola request"})
  res.sendFile(__dirname + "/index.html")
})





serverHttp.listen(3000,()=>{
    console.log(" servidor on http://localhost:3000")
})




// APP WEBSOCKETS



ioSocket.on("connection",(socket)=>{
  console.log("recovered", socket.recovered)

  console.log("cliente conectado")

  socket.on('disconnect', () => {
    console.log('Cliente desconectado')
  })


  socket.on("my-event",(data)=>{
    console.log("mensaje de mi evento", data)
  })


  socket.on("writing",(data)=>{
    
    if (data.value===true) {
      socket.emit("writing",{value:true,message:data.message})
    }else{
      socket.emit("writing",false)
    }
  })

})
