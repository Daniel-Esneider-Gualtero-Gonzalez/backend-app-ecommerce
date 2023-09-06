
// midleware de validacion de los datos de la ruta:  "/posters/create"


export function validateCreatePoster(req,res,next) {
    if (req.body) res.status(400).json({message:"Datos no validos"})

//    debemos aplicar la logica para verificar que las propiedades
//  tengan el mismo nombre que la base de datos y el mismo tipo de dato que las
// necesiten las funciones que procesan esta ruta


}