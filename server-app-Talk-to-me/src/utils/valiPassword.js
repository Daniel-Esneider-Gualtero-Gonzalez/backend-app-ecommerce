import bcrypt from "bcrypt";


export async function valiPassword(password,hash) {
  try {
    const result = await bcrypt.compare(password,hash)
    return result
  } catch (error) {
    return {error:"error al validar credenciales"}
  }
   
    
    
}