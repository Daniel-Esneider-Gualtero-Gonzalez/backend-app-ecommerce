import { ValidatePropsObjet } from "../../utils/midlewaresUtil.js";
import responses from "../../responses.js";


// midleware que valida las propiedades que debe tener 
// el body cuando se realiza una peticion
export const validateDataAuthUser = (req,res,next)=>{

    const propsVitals = {username:"",password:""}

    const validateData = ValidatePropsObjet(req.body,propsVitals)

    // tener cuidado ya que agregue otro objeto que tiene errores no especificos
    if (!validateData) return res.status(responses.respons.BAD_REQUEST.status).json(responses.respons.BAD_REQUEST.message)

    
    return next()
}