import { config as configureEnvVars } from "dotenv"
import app from "./api/api.js";
import db from "./db/index.js";



configureEnvVars();
// que la aplicacion se escuche en puerto
/*app.listen(process.env.PORT,()=>{
    console.log(`API IS RUNNING IN PORT http://localhost:${process}`);

});*/

// otra forma de hacerlo

const PORT = process.env.SERVER_PORT; 

db.connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`API IS RUNNING IN PORT http://localhost:${PORT}`);
    });
});

//.env nunca se sube a su repositorio
/*  para iniciarl el proyecto instalamos 
 install express sequelize cors */


 // instalar dependecias de oracle para trabar con el
 // npm install --save oracledb