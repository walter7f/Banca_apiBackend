import express from "express";
import cors from "cors"
import userRouter from "../routes/user.router.js";
import accountRouter from "../routes/account.router.js";
import expensesRouter from "../routes/expenses.router.js";
import incomeRouter from "../routes/income.router.js";

import cookieParser from "cookie-parser";

const app =express();

app.use(cors());
app.use(cookieParser());
//usando los miderwers
app.use(express.json());

//parsear x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

app.use("/api/budget-management", userRouter, expensesRouter, incomeRouter,accountRouter);

export default app;

//logers morgan
