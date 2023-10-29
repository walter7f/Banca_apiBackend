import Account from "../models/Account.js";

export async function createAccount(request, response){
    try {
        const {account_number, name_bank,currency, balance,id_user}= request.body;
        const newAccount  = await Account.build({account_number, name_bank, currency,balance,id_user}).save();

        response.send(newAccount);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while creating a new Account "+ error,
            error,
        });
        
    }
};

export async function getAllAccount(request, response){
    try {
        const accounts = await Account.findAll();
        response.send(accounts);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while gettinf all product:  "+ error,
            error,
        });
    }
}

export async function getOneAccount(request, response){
    const id = request.params.id;

    try {
        const account = await Account.findOne({where:{ id }});
        if(!account){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(account);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function deleteOneAccount(request, response){
    const id = request.params.id;

    try {
        const deleteAccount = await Account.destroy({where:{ id}});
        
        if(deleteAccount === 1){
            return response.send({message:"Product deleted"});
        }
        response.send({message:"Product wan not removed"});
    } catch (error) {
        response.status(500).send({
            message: `There war an error while deleting  product:${id} ` + error,
            error,
        });
    }
}

export async function getQuery(request, response){
    const id = request.params.id;

    try { 
        const account = await Account.findAll({where:{ id_user:id }});
        if(!account){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(account);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function UpdateA(request, response){


    try {
        const id = request.params.id;
    
        const updateAcc = await Account.update({
            balance:request.body.balance, 
        },{
            where:{
                id:id
            }})

        
        response.send(updateAcc);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}



export async function buscarCuenta ( request, response){
    try {
        const{name_bank, account_number}= request.body
        const accountFound=  await Account.findOne({where:{name_bank, account_number}})
        if(!accountFound){
            return response
            .status(404)
            .send({message: "Cuenta no encontrada"});
           };
        const idResult= await accountFound.getDataValue('id')
        const moneda= await accountFound.getDataValue('currency')
        const saldo = await accountFound.getDataValue('balance')
        response.send({idResult, moneda, saldo})
    } catch (error) {
        
    }
}