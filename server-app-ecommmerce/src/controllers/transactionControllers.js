
import ServiceTransaction from "../services/serviceTransaction.js";



export class transactionControllers {

    // devuelve el saldo de un usuario
    handleGetBalanceUser(req,res){

        

    }

    // recarga el saldo del usuario
    handleRechargeBalance(req,res){


    }

    // realiza compra
    handleMakePurchase(req,res){

    }
    
}

//  esto es un singleto ya que estamos exportanto siempre la misma instancia
export default new transactionControllers()