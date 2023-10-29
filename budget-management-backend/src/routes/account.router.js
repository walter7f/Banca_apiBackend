import express from "express";
import {
    createAccount,
    getAllAccount,
    getOneAccount,
    deleteOneAccount,
    getQuery,
    buscarCuenta,
    UpdateA
} from "../controllers/account.controller.js";
import {Auth} from '../middleware/auth.middleware.js';

const accountRouter =  express.Router();

accountRouter.post("/account",createAccount);
accountRouter.get("/account", getAllAccount);
accountRouter.get("/account/:id", getQuery)
accountRouter.post("/account3",buscarCuenta);
accountRouter.get("/account1/:id",getOneAccount);
accountRouter.patch("/account2/:id", UpdateA )
accountRouter.delete("/account/:id", deleteOneAccount);


export default accountRouter;


