import { Router } from "express";

// midlewares de posters
import { validateCreatePoster } from "../midlewares/posters/postersMidlewares.js";
import { validateCreateComment } from "../midlewares/posters/postersMidlewares.js";

// fin de midlewares de posters






// Handlers de las rutas de posters
import { handleGetPostersUser } from "../controllers/postersController.js";
import { handleGetAllPosters } from "../controllers/postersController.js";
import { handleCreatePoster } from "../controllers/postersController.js";
import { handleCreateCommentPoster } from "../controllers/postersController.js";





export const routerPosters = Router()



// METODO:  Get

routerPosters.get("/posters/",handleGetAllPosters)

// todos los poster de un usuario

routerPosters.get("/posters/:iduser",handleGetPostersUser)

// todos los posters con sus comentarios
routerPosters.get("/posters/comments/all",(req,res)=>{

})
//  un poster de un usuario con sus commentarios

routerPosters.get("posters/iduser/idposter/comments")

// todos los poster con sus comentarios, de un usuario
routerPosters.get("/posters/comments/all/:iduser",(req,res)=>{

})


// METODO:  POST

routerPosters.post("/posters/create", validateCreatePoster ,handleCreatePoster)

routerPosters.post("/posters/comment/create",validateCreateComment,handleCreateCommentPoster)
