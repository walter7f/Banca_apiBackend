import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import moment from "moment";
import { config as configureEnvVars} from "dotenv"


export async function createUser (request, response){
    try {
        configureEnvVars();
        if (
            !request .body.name ||
            !request .body.email || 
            !request .body.password ||
            !request .body.country
            ){
             return response
             .status(404)
             .send({mesage: "user data missing"});
             }

        const {name, email, password, country}=
        request.body;

        /* 
        0. validar la integridad de db
        1. validar usuario en db
        2. validaciones para contraseña
        2. validar que no este en lista negra yogmer correo no valido
        */
     
        const passwordHash = await bcrypt.hash(
            password,
            10
            );

        const user = User.build({
            name,
            email,
            password: passwordHash,
            country,
        });
        const newUser = await user.save();

        response.send({newUser});

    } catch (error) {
        response.status(500).send({
            message: "Error creating the new user" , error  
        });
        
    }
}

export async function login(request, response){
    configureEnvVars();
    try {
        if (
            !request .body.email || 
            !request .body.password
            ){
             return response
             .status(404)
             .send({mesage: "user data missing"});
             }
             
        const {email, password, id}= request.body;

        /*
        1. validar usuario en db
        */
       const userFound = await User.findOne({
        where: {email},
       });
       if (!userFound){
        return response
        .status(404)
        .send({message:"User not found"});
       }
       
       const isPasswordCorrect = 
       await bcrypt.compare(
        password,
        userFound.getDataValue("password")
       );

       if(!isPasswordCorrect){
        return response
        .status(404)
        .send({message: "passoword is wrong"});
       };

       const userPayload = {
        email: userFound.getDataValue("email"),
        iat: moment().add({hours: 3}).unix(),
       };

       const token = jwt.sign(
        userPayload,
        process.env.PRIVATE_KEY
        );
        
        const idUser= await userFound.getDataValue("id")
        response.cookie('authorization', token);
    
        response.send({token, idUser});

    } catch (error) {
        response.status(500).send({
            message: "Error in login the  user",
        });
        
    }
}








//cookies = 
//npm install cookie-parser yarn add cookie-parser
















// usar node.bcrypt.js    npm install bcrypt
  