
// Importamos modulo de respuestas
import responses from "../responses.js";

import { getPostersByUser } from "../utils/supabase/posters/postersUtils.js";
import { getAllPosters } from "../utils/supabase/posters/postersUtils.js";
import { createPoster } from "../utils/supabase/posters/postersUtils.js";
import { categoriPosterExist } from "../utils/supabase/posters/postersUtils.js";
import { createPosterCategories } from "../utils/supabase/posters/postersUtils.js";
import { createPosterComment } from "../utils/supabase/posters/postersUtils.js";
import { posterExist } from "../utils/supabase/posters/postersUtils.js";


// desestructurasmos solo las respuestas de los posters
const {responsPoster} = responses

export async function handleGetAllPosters(req,res) {
    
    const getPosters = await getAllPosters()
    // verificamos si hubo un error al consultar y traer los posters
    if(getPosters.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    if (getPosters.length < 1) return res.status(responsPoster.NO_CONTENT.status)

    return res.status(200).json(getPosters)

}

// get all posters de un usuario
export async function handleGetPostersUser(req,res) {

    const {iduser}=req.params

    if (isNaN(parseInt(iduser))) return res.status(responsPoster.BAD_REQUEST.status).json(responsPoster.BAD_REQUEST)
    
    const posterUser = await getPostersByUser(iduser)

//  le paso el error que me arroja la obtencion de los poster
    if (posterUser.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(posterUser.error)

    // respondo lo que obtenga ya sea tenga posters o no 
    // debido a que no me deja responder con validaciones no se porque
    // pero realizo validaciones y no funciona 
    // la base de datos funciona bien trae la informacion tenga posters o no
    // no se lo que sucede

    res.status(responsPoster.OK.status).json(posterUser)
   
    
    
    
    
}





// controller de creacion de un poster
export async function handleCreatePoster(req,res) {

    const {categories} = req.body
   

    const createdPoster = await createPoster(req.body)

    

    // verificamos que el poster se halla crado exitosamente de lo contrario responderiamos
    if (createdPoster === false) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    const cateExist = await categoriPosterExist(categories)

    // verificamos si hubo un error si las categorias existen
    if(cateExist.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(cateExist)
    //  si las categorias proporcionadas no existen, error del cliente
    if (cateExist.message) return res.status(responsPoster.ERROR_CLIENTE.status).json(cateExist)

    // creamos las categorias del poster
    const createdCategories = await createPosterCategories(createdPoster,categories)

    // si hubo un error al crear las categorias
    if(createdCategories.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    res.status(responsPoster.OK.status).json(responsPoster.CREATE)

    


    


    
}



export async function handleCreateCommentPoster(req,res) {
    
    const {id_poster} = req.body
    
    //  verificamos si existe el poster
     const existPoster = await posterExist(id_poster)

     if(existPoster.error) return res.status(500).json({error: "Error al verificar si el poster existe"})

     if(existPoster===false) return res.status(404).json({error: "El poster que esta intentando comentar no existe"})

    //  creamos el comentario del poster
     const createComment = await createPosterComment(id_poster,"Hola soy el ferst comment")
    
     //  respondemos el mensaje de error que nos devuelve la funcion que crea el commentario
     if (createComment.error) return res.status(500).json(500).json(createComment.error)


    //  respondemos el mensaje succes que nos devuelve la funcion que crea el commentario
     return res.status(200).json({message:"Comentario creado exitosamente"})

}