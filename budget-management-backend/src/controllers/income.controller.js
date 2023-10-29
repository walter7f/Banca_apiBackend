import Account from "../models/Account.js";
import Income from "../models/Income.js"

export async function createIncome(request, response){
    try {
        const {name,currency, amount, category,id_user,id_account}= request.body;

        const newIncome  = await Income.build({name,currency,amount,category, id_user,id_account}).save();
        
        response.send(newIncome);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while creating a new Income: "+ error,
            error,
        });
        
    }
};

export async function getAllIncome(request, response){
    try {
        const incomes = await Income.findAll();
        response.send(incomes);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while gettinf all product:  "+ error,
            error,
        });
    }
}

export async function getOneIncome(request, response){
    const id = request.params.id;

    try {
        const income = await Income.findOne({where:{ id }});
        if(!income){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(income);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function deleteOneIncome(request, response){
    const id = request.params.id;

    try {
        const deleteIncome = await Income.destroy({where:{ id }});
        if(deleteIncome === 1){
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
        const icome = await Income.findAll({where:{ id_user:id }});
        if(!icome){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(icome);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function getQueryComplete(request, response){
    const id = request.params.id;

    try { 
        const income= await Income.findAll({where:{ id_user:id },
        include:[{model:Account}]
        });
        if(!income){
            return response.status(404).send({messge: "Income not found"});
        }
        response.send(income);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting Income  : "+ error,
            error,
        });
    }
}