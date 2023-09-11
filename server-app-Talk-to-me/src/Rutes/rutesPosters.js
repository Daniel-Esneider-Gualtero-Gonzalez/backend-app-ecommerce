import { Router } from "express";

// midlewares de posters
import { validateCreatePoster } from "../midlewares/posters/postersMidlewares.js";

// fin de midlewares de posters



// Handlers de las rutas de posters
import { handleGetPostersUser } from "../controllers/postersController.js";
import { handleGetAllPosters } from "../controllers/postersController.js";
import { handleCreatePoster } from "../controllers/postersController.js";




export const routerPosters = Router()



// METODO:  Get

routerPosters.get("/posters/",async (req,res)=>{
    // no se necesita body
    handleGetAllPosters(res)
})

// todos los poster de un usuario

routerPosters.get("/posters/:iduser",handleGetPostersUser)

// todos los posters con sus comentarios
routerPosters.get("/posters/comments/all",(req,res)=>{

})

// todos los poster con sus comentarios, de un usuario
routerPosters.get("/posters/comments/all/:iduser",(req,res)=>{

})


// METODO:  POST

// routerPosters.post("/posters/create", validateCreatePoster ,handleCreatePoster)
