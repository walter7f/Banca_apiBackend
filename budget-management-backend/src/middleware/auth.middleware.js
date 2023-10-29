
import { config as configureEnvVars} from "dotenv"
import jwt from "jsonwebtoken";
import moment from "moment";


export async function Auth(request, response, next){
    configureEnvVars();
    try {

        const {authorization}= request.headers;
        const {authorization:cookieAuth} = request.cookies;

        // usar authorization o cookieAuth
        if (!cookieAuth){
            return response
            .status(401)
            .send({message:"Not Authorization"})
        }

        try {
            const token = jwt.verify(
                cookieAuth, 
                process.env.PRIVATE_KEY
                );
    
            if(token.iat <= moment().unix()){
                return response.send({
                    message: " Sesion expired",
                });
            }
    
            next();
        } catch (error) {
            response.status(401).send({
                message: "authentication process failed",
                error,
            })
        }


        
    } catch (error) {
        response.status(500).send({
            message: "authentication process failed"
        })
        
    }
}