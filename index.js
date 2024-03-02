import { createServer } from "http"
import { app } from "./src/App.js"
import dotenv from 'dotenv'

dotenv.config()

const serverHttp = createServer(app) // maneja las conexiones crea el host 
 

serverHttp.listen(3000,()=>{
    console.log(" servidor on http://localhost:3000")
})
