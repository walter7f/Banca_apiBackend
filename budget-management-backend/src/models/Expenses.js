import {DataTypes} from "sequelize"
import db from "../db/index.js";
import User from "./User.js";
import Account from './Account.js'


const Expenses = db.get().define(
    "Expesnses",
     {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        amount:{
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        category:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        schema: "BD_BUDGET",
    }
);
Expenses.belongsTo(User, {foreignKey: "id_user"});
Expenses.belongsTo(Account,{foreignKey:"id_account"});

export default Expenses;


// orm  BD relacional
// odm   BD no relacional