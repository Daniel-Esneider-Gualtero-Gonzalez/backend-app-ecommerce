import jwt from 'jsonwebtoken'

export const convertNumber =  (number)=>{
    return Number(number)
}

export const extractUserDataFromToken = (token)=>{

    try {
        const dataToken = jwt.verify(token,process.env.JWTSECRET) 
        return dataToken
        
    } catch (error) {
        
       console.log("Error al extraer los datos del token")

        return null
    }

    
}