

// Funcion que valida si las propiedades vitales
//  estan en un curpo o en un objeto
export function ValidatePropsObjet(objectbody,vitalprops) {
    for(let prop in vitalprops) {

        if (! prop in objectbody || objectbody[prop] === undefined)  return false
        

        if (Number.isInteger(vitalprops[prop])){
            
            // si el value de la prop del body no es un entero retornamos false
            if (!Number.isInteger(objectbody[prop])) return false
            continue
        }

        if (Array.isArray(vitalprops[prop])){

            if(Array.isArray(objectbody[prop])) continue
            else return false
            
        }

            // retornamos false si el tipo de dato de la prop vital
            //  no es el mismo que el tipo de dato de la prop del body

        // valida los trings
        
        if (typeof vitalprops[prop] ===  typeof objectbody[prop]){
                
        }else return false




    }
     // Si todo es correcto devolvemos true
    return true
}
