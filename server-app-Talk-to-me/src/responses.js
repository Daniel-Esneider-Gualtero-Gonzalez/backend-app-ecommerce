
//  respuestas para las rrutas o entidades de posters

const responsPoster = {
    OK :  {status:200, message: "Operaion exitosa"} ,
    CREATE: {status:201, message: "Poster creado exitosamente"} ,
    ERROR_CLIENTE : {status:400, message: "Solicitud Invalida del cliente"} ,
    ERROR_SERVIDOR: {status:500, message: "Error interno del servidor"},
    NO_CONTENT: {status:204},
    BAD_REQUEST: {status:400, message: "Datos mal proporcionados"},
    NOT_FOUND: {status:404}
}




export default {
    responsPoster,
}