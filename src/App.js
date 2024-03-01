import {createServer} from 'http'
import {Server} from 'socket.io'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
// importaciones de sockets
function getUserSendMessage(userconects,iduser) {
    
  for (const iterator of userconects) {
      
      if (iterator.iduser === iduser) return iterator
  }

  return false
}


// fin importaciones de sockets






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

 
 const app = express() // se encarga de manejar rutas midlewares y demas que llegan al host server
 
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Habilita CORS para todos los orígenes
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', '*'); // Cabeceras permitidas
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

const allUsersConnect = new Set([])
let allUserMessages = []



ioSocket.on("connection",(socket)=>{

  console.log("cliente conectado")
  // console.log("socket id DENTRO DE EVENTO PRICIPAL DE CONECCCION", socket.id)

  


  // evento cuando se conecta un usuario y guadamos sus datos en un array de user

  socket.on("dataUserConnect",(data)=>{
   
    // Que cuando se conecte enviarles todos los mensajes almacenados
    

    // añadimos los datos del usuario y conexion 
    allUsersConnect.add({socketid:socket.id, ...data})
    console.log("client conectaddos",allUsersConnect)
  })

  // Evento cuando el usuario envia un mensaje
  // recibimos guardamos y enviamos
  socket.on("message",(data)=>{
    
    allUserMessages = [...allUserMessages,data]
    
    // enviamos al cliente esto mas el nombre de usuario que lo envio
    const whoSendMessage = getUserSendMessage(allUsersConnect,data.iduser)
    const {username} = whoSendMessage
   
    ioSocket.emit("message",{...data,username})

    
  })


})
