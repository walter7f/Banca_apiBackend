import express from "express";
import {
    createIncome,
    getAllIncome,
    getOneIncome,
    deleteOneIncome,
    getQuery,
    getQueryComplete
} from "../controllers/income.controller.js";

const incomeRouter = express.Router();

incomeRouter.post("/income", createIncome);
incomeRouter.get("/income", getAllIncome);
incomeRouter.get("/income/:id", getQuery)
incomeRouter.get("/income2/:id", getQueryComplete)
incomeRouter.get("/income/:id", getOneIncome);
incomeRouter.delete("/income/:id", deleteOneIncome);

export default incomeRouter;
 