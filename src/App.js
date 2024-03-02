import {createServer} from 'http'
import {Server} from 'socket.io'
import express from 'express'

// importaciones de sockets
function getUserSendMessage(userconects,iduser) {
    
  for (const iterator of userconects) {
      
      if (iterator.iduser === iduser) return iterator
  }

  return false
}


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

 
 export const app = express() // se encarga de manejar rutas midlewares y demas que llegan al host server
 
 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Habilita CORS para todos los orígenes
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', '*'); // Cabeceras permitidas
  // ...

  // Continúa con el siguiente middleware o ruta
  next();
});

 

//  APLICACION EXPRESS

app.use(express.json())

// todas la rutas que tenga que ver con el usuario
app.use(routerUser)

// todas las rutas de posters
app.use(routerPosters)

app.use("/", (req,res)=>{

  return res.json({message:"Welcome to backend of th app my-ecommerce"})
})

app.get("/chat",(req,res)=>{

  res.sendFile(__dirname + "/index.html")
})











