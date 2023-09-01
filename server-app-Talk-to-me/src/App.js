import {createServer} from 'http'
import {WebSocketServer} from 'ws'
import express from 'express'



import { routerUser } from './Rutes/rutesUser.js'


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
 const wsServer = new WebSocketServer({server:serverHttp})

 wsServer.on('connection', function connection(ws) {
  wsServer.on('error', console.error);

  wsServer.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

//  APLICACION EXPRESS

app.use(express.json())

// todas la rutas que tenga que ver con el usuario
app.use(routerUser)



app.get("/message/:message",(req,res)=>{
  res.send(req.params)
})

app.get("/chat",(req,res)=>{

  res.sendFile(__dirname + "/index.html")
})





serverHttp.listen(3000,()=>{
    console.log(" servidor on http://localhost:3000")
})