import { ValidatePropsObjet } from "../../utils/midlewaresUtil.js"
import responses from "../../responses.js"

// midleware de validacion de los datos de la ruta:  "/posters/create"
export function validateCreatePoster(req,res,next) {
    const {responsPoster} = responses
    // creamos la estructura de las name de propiedades con el tipo de valor
    // que necesitamos 
    const propsVitals = {id_user:1,title:"",description:"",categories:[]}
    

    const validateData = ValidatePropsObjet(req.body,propsVitals)

    
    
    if (!validateData) return res.status(responsPoster.ERROR_CLIENTE.status).json(responsPoster.ERROR_CLIENTE)

    
    return next()



}