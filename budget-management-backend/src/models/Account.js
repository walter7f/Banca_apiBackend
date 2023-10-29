import {DataTypes} from "sequelize"
import db from "../db/index.js";
import User from "./User.js";


const Account = db.get().define(
    "Account",
     {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        
        account_number: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        
        name_bank:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.NUMBER,
            allowNull: false,
            
        },
    },
    {
        schema: "BD_BUDGET",
    }
);
Account.belongsTo(User,{foreignKey:"id_user"});

export default Account;
