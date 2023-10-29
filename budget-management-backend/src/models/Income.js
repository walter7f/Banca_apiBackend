import {DataTypes} from "sequelize"
import db from "../db/index.js";
import User from "./User.js";
import Account from "./Account.js";


const Income = db.get().define(
    "Income",
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
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        schema: "BD_BUDGET",
    }
);

// esto hace la relacion con las demas tablas 
Income.belongsTo(User, {foreignKey: "id_user"});
Income.belongsTo(Account,{foreignKey: "id_account"})


export default Income;
