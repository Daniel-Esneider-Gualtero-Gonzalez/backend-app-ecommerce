
import serviceTransaction from "../services/serviceTransaction.js";
import { extractUserDataFromToken } from "../utils/helpers.js";




export class transactionControllers {

    // devuelve el saldo de un usuario
    async handleGetBalanceUser(req, res) {

        // verificamos tenga el token
        if(!req.headers.authorization){
            return res.status(401).json({message:"Credenciales Invalidas"})
        }
        
        let user_id = null
        const token = req.headers.authorization.split(" ")[1]
        const dataTokenUser = extractUserDataFromToken(token)

        // esto es por si falla al extraer los datos del token
        if(dataTokenUser){
            user_id = dataTokenUser.id
        }else{
            return res.status(401).json({message:"Credenciales Invalidas"})
        }

        const userBalance = await serviceTransaction.getUserBalance(user_id)

        if(userBalance.error){
            return res.status(500).json({ error: 'Error interno del servidor al obtener el saldo.' })
        }

        
        return res.status(200).json(userBalance)




    }

    // recarga el saldo del usuario
    async handleRechargeBalance(req, res) {

        // recuperamos el id del usuario del token
        let user_id = null
        const token = req.headers.authorization.split(" ")[1]
        
        const dataUser = extractUserDataFromToken(token)

        if(dataUser){
            user_id = dataUser.id
        }else{
            return res.status(401).json({message:"Credenciales Invalidas"})
        }

        // recuperamos los valores que necesitamos del body ya que el midleware las asegura que vienen
        const { amount } = req.body

        const recharge = await serviceTransaction.rechargeBalance(user_id, amount, "recharge")

        if (recharge.error) {
            return res.status(500).json({ message: "Error al recargar saldo" })
        }

        return res.status(200).json({message:"La recarga se completo con exito",...recharge})

    }

    // realiza compra
    async handleMakePurchase(req, res) {

    }

}

//  esto es un singleto ya que estamos exportanto siempre la misma instancia
export default new transactionControllers()