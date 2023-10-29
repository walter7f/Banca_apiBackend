import { Sequelize, where } from "sequelize";
import Account from "../models/Account.js";
import Expenses from "../models/Expenses.js"

export async function createExprenses(request, response){
    try {
        const {name,currency, amount, category,id_user,id_account}= request.body;

        const newExprenses  = await Expenses.build({name,currency,amount,category,id_user,id_account}).save();
        
        response.send(newExprenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while creating a new product: ",
            error,
        });
        
    }
};

export async function getAllExprenses(request, response){
    try {
        const expenses = await Expenses.findAll();
        response.send(expenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while gettinf all product:  "+ error,
            error,
        });
    }
}

export async function getOneExprenses(request, response){
    const id = request.params.id;

    try {
        const expenses = await Expenses.findOne({where:{ id }});
        if(!expenses){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(expenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function deleteOneExpenses(request, response){
    const id = request.params.id;

    try {
        const deleteExpenses = await Expenses.destroy({where:{ id }});
        if(deleteExpenses=== 1){
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
        const expenses = await Expenses.findAll({where:{ id_user:id }});
        if(!expenses){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(expenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}
export async function getExpenId(request, response){
    const id = request.params.id;

    try { 
        const expenses = await Expenses.findAll({where:{ id_account:id }});
        if(!expenses){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(expenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}

export async function PagoExpe(request, response){
    const t = await Sequelize.transaction();

    try {

      /*  const {name,currency, amount, category,id_user,id_account}= request.body;

        const newExprenses  = await Expenses.build({name,currency,amount,category,id_user,id_account}).save();
        
        response.send(newExprenses);*/
        const {name, currency, amount, category, id_user, id_account}= request.body
        const newExprenses = await Expenses.build({name, currency, amount, category, id_user, id_account},{transaction:t}).save();
        const account = Account.update({

                balance: balance - amount,
                where:{id:id_account}
        },{transaction: t })

        await t.commit();
        response.send(newExprenses, account);
    } catch (error) {
        await t.rollback();
        response.status(500).send({
            message: "There war an error while creating a new product: ",
            error,
        });
        
    }
};

export async function getQueryComplete(request, response){
    const id = request.params.id;

    try { 
        const expenses = await Expenses.findAll({where:{ id_user:id },
            include:[{model:Account}]
        });
        if(!expenses){
            return response.status(404).send({messge: "product not found"});
        }
        response.send(expenses);
    } catch (error) {
        response.status(500).send({
            message: "There war an error while getting product  : "+ error,
            error,
        });
    }
}