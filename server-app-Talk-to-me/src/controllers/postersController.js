
// Importamos modulo de respuestas
import responses from "../responses.js";


import { createPoster } from "../utils/supabase/posters/postersUtils.js";
import { categoriPosterExist } from "../utils/supabase/posters/postersUtils.js";
import { createPosterCategories } from "../utils/supabase/posters/postersUtils.js";


// controller de creacion de un poster
export async function handleCreatePoster(req,res) {

    const {categories} = req.body
    const {responsPoster} = responses

    const createdPoster = await createPoster(req.body)

    

    // verificamos que el poster se halla crado exitosamente de lo contrario responderiamos
    if (createdPoster === false) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    const cateExist = await categoriPosterExist(categories)

    // verificamos si hubo un error si las categorias existen
    if(cateExist.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(cateExist)
    //  si las categorias proporcionadas no existen, error del cliente
    if (cateExist.message) return res.status(responsPoster.ERROR_CLIENTE.status).json(cateExist)

    const createdCategories = await createPosterCategories(createdPoster,categories)

    if(createdCategories.error) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    res.status(responsPoster.OK.status).json(responsPoster.CREATE)

    


    


    
}