import { supabaseClient } from "../CRUD/conexion.js";

class ServiceTransaction {


    // recargar saldo
    async rechargeBalance(iduser, balance, type) {

        const { data: dataRecharge, error } = await supabaseClient.from("recharge").insert({
            user_id: iduser,
            amount: balance
        }).select()

        if (error) {

            return { error: "error al relizar la recarga" }
        }

        const { id_recharge } = dataRecharge[0]

        // actualizar el saldo del usuarip
        try {
            const newBalance = await this.updateUserBalance(iduser, balance, type)

            return newBalance

        } catch (error) {
            // rrolbakc de la recarga
            // console.log("error en updateuserbalance  Realizar rrollback de la recarga")
            await this.rrollbackRecharge(id_recharge, iduser)

            // retornamos
            return { error: "error al relizar la recarga" }
        }


        // falta  realizar el registro en transacciones

    }


    // metodo de actualizar el saldo del usuario des pues que recarga o que realiza una compra

    async updateUserBalance(iduser, amount, type) {

        let balance = null

        const { data: user_balance, error } = await supabaseClient.from("user_balance").select("*").eq("user_id", iduser)

        if (error) {
            // console.log("error al traer el balance del usuario")

            const errorGetBalance = { error: 'Error al obtener el balance del usuario' }
            throw errorGetBalance
        }

        // verificamos que tenga un registro en la entidad balance o si no lo creamos
        if (user_balance.length === 0) {
            // console.log("el usuario no tiene registro en entidad user_balance creando...")
            const createUserBalance = await this.createUserBalanceRecord(iduser)
            if (createUserBalance.error) {
                const errorCreateBalance = { error: 'Error al obtener el balance del usuario' }
                throw errorCreateBalance

            }

            balance = createUserBalance[0].balance

        } else {
            balance = user_balance[0].balance
        }


        let newBalance = balance
        //el type es que si es recarga sumamos y si no debitamos
        if (type === "recharge") {
            // valance que ya tenia mas el nuevo
            newBalance = balance + amount
        }

        if (type === "compra") {

            newBalance = balance - amount
        }


        const { data: userBalanceUpdate, error: errorUpdateBalance } = await supabaseClient.from("user_balance").update({
            balance: newBalance,
            last_modification: new Date()
        }).eq("user_id", iduser).select()

        if (errorUpdateBalance) {

            const errorUpdateBalance = { error: 'Error al actualizar el balance del usuario' }
            throw errorUpdateBalance
        }

        // eliminamos las props de la entidad que no enviaremos
        const balanceUpdate = userBalanceUpdate[0]
        delete balanceUpdate.user_id
        delete balanceUpdate.id_user_balance


        return balanceUpdate

    }

    // mecanismo para revertir la recarga cuando el mecanismo de update user balance falle , ya que supabase no proporciona 
    // transacciones que seria mas facil.

    async rrollbackRecharge(id_recharge, user_id) {

        const { error } = await supabaseClient.from("recharge").delete().eq("id_recharge", id_recharge, 'user_id', user_id)

        if (error) {

            return { error: "Error al realizar el rrollback de la recarga" }
        }

        return { success: "Exito al realizar el rrollback de la recarga" }


    }

    // Método para crear el registro en user_balance , ya que quiere realizar operaciones con saldo
    async createUserBalanceRecord(user_id) {

        const { data, error } = await supabaseClient.from("user_balance").insert({
            balance: 0,
            user_id: user_id
        }).select()

        if (error) {
            return { error: "Error al crear el balance del usuario" }
        }

        return { success: "Exito al crear el balance del usuario", balance: data[0] }
    }

}

export default new ServiceTransaction()





class servicePurchase {

    // metodo para verificar que el usuario cuente con saldo suficiente para realizar la compra
    async hasAvailableBalance(user_id, amountTotalCompra) {

        const { data, error } = await supabaseClient.from("user_balance").select("*").eq("user_id", user_id)

        if (error) {
            return { error: "Error al obtener el balance del ususario" }
        }

        const { balance } = data[0]

        // si el monto de la No Supera su balance  tiene saldo disponible
        if (amountTotalCompra <= balance) return true

        // si no cuenta con saldo suficiente
        return false


    }

    // metodo para realizar la compra
    async makePurchase() {

    }



    // reutilizar la logica del update user balance del servicio de  transacciones
    // utilizaremos "composicion"  que es tener una instancia del servicio de transacciones en esta para poder
    // reutilizar sus funcionalidades


}