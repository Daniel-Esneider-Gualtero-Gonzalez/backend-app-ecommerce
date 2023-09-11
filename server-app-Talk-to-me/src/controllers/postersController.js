
// Importamos modulo de respuestas
import responses from "../responses.js";

import { getPostersByUser } from "../utils/supabase/posters/postersUtils.js";
import { getAllPosters } from "../utils/supabase/posters/postersUtils.js";
import { createPoster } from "../utils/supabase/posters/postersUtils.js";
import { categoriPosterExist } from "../utils/supabase/posters/postersUtils.js";
import { createPosterCategories } from "../utils/supabase/posters/postersUtils.js";


// desestructurasmos solo las respuestas de los posters
const {responsPoster} = responses

export async function handleGetAllPosters(res) {
    
    const getPosters = await getAllPosters()
    // verificamos si hubo un error al consultar y traer los posters
    if(getPosters.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    if (getPosters.length < 1) return res.status(responsPoster.NO_CONTENT.status)
    return res.json(getPosters)

}

export async function handleGetPostersUser(req,res) {

    const {iduser}=req.params

    if (isNaN(parseInt(iduser))) return res.status(responsPoster.BAD_REQUEST.status).json(responsPoster.BAD_REQUEST)
    
    const posterUser = await getPostersByUser(iduser)

//  le paso el error que me arroja la obtencion de los poster
    if (posterUser.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(posterUser.error)

    // debo solucionar que responde ya que se queda cargando
        
    if (posterUser.length < 1 ) return res.status(responsPoster.NO_CONTENT.status)
    console.log("poster de user",posterUser)
    
    return res.status(responsPoster.OK.status).json(posterUser)
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