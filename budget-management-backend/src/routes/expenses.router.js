import express from "express";
import {
    createExprenses,
    getAllExprenses,
    getOneExprenses,
    deleteOneExpenses,
    getQuery,
    getQueryComplete,
    getExpenId,
    PagoExpe
} from "../controllers/expenses.cotroller.js";


const expensesRouter= express.Router();

expensesRouter.post("/expenses", createExprenses);
expensesRouter.get("/expenses", getAllExprenses);
expensesRouter.get("/expenses/:id", getQuery)
expensesRouter.get("/expenses2/:id", getQueryComplete)
expensesRouter.get("/expensesid/:id", getExpenId)
expensesRouter.post("/expenses", PagoExpe);
expensesRouter.get("/expenses/:id", getOneExprenses);
expensesRouter.delete("/expenses/:id", deleteOneExpenses);


export default expensesRouter;
