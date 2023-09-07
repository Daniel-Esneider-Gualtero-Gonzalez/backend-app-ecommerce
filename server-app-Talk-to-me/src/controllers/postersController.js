
// Importamos modulo de respuestas
import responses from "../responses.js";


import { createPoster } from "../utils/supabase/posters/postersUtils.js";



// controller de cracion de un poster
export async function handleCreatePoster(req,res) {

    console.log("llegue al hdnle create poster despues de ave pasado por el midleware")
    const {responsPoster} = responses

    const create_poster = await createPoster(req.body)

    if (create_poster === false) return res.status(responsPoster.ERROR_SERVIDOR.status).json(responsPoster.ERROR_SERVIDOR)

    console.log(create_poster)


    
}