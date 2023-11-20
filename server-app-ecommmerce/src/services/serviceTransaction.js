import { supabaseClient } from "../CRUD/conexion.js";

class ServiceTransaction {


    // recargar saldo
    async rechargeBalance (iduser,balance){

        const {error} = await supabaseClient.from("recharge").insert({
            user_id:iduser,
            amount:balance
        })

        if(error){
            console.log(error)
            return {error:"error al relizar la recarga"}
        }

        console.log("nuevo saldo del usuario",data)

        return {success: "Exito al recargar"}

        

    }


    // metodo de actualizar el saldo del usuario des pues que recarga o que realiza una compra

    async updateUserBalance(iduser,balance,type) {

    //el type es que si es recarga sumamos y si no debitamos
    const {error,user} = await supabaseClient.from("user_balance").select("balance").eq("user_id",iduser)
    
        
    }
}

export default new ServiceTransaction ()



// funciones que ayudan a realizar este servicio