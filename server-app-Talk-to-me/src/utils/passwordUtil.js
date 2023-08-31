import {hash,genSalt} from 'bcrypt'

const numSalt =10

export async function genPassword(password) {
    
    try {
        const password_salt = await genSalt(numSalt)
        const password_hash = await hash(password,password_salt)

        return {password_salt,password_hash}
    } catch (error) {
        return({error:"No se pudo crear la contraseña"})
    }

    
}