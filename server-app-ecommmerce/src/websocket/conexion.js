import { ioSocket } from "../App";



// funcion que retorna el objeto de un usuario por su id
export function getUserSendMessage(userconects,iduser) {
    
    for (const iterator of userconects) {
        
        if (iterator.iduser === iduser) return userconects[iterator]
    }

    return false
}

