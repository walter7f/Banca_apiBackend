import {DataTypes} from "sequelize"
import db from "../db/index.js";
//import Account from "./Account.js";

const User = db.get().define(
    "User",
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country:{
            type:DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        schema: "BD_BUDGET", 
    }
);




export default User;
