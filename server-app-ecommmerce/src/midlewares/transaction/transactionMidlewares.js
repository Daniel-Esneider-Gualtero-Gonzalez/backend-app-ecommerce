import responses from "../../responses.js"
import { ValidatePropsObjet } from "../../utils/midlewaresUtil.js"

export function validatePropRecharge(req,res,next) {
    
    // creamos la estructura de las name de propiedades con el tipo de valor
    // que necesitamos 
    const propsVitals =  {user_id:1,amount:1} 
    

    const validateData = ValidatePropsObjet(req.body,propsVitals)

    
    
    if (!validateData) return res.status(responses.respons.BAD_REQUEST.status).json(responses.respons.BAD_REQUEST.message)

    
    return next()



}