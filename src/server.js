import express from "express";
import configViewEngine1 from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from './configs/connectDB';
import initApiRoutes from "./routes/api";
import confixCors from './configs/cors';
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8080;

//config Cors
confixCors(app);

configViewEngine1(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB;
connection();



initWebRoutes(app);
initApiRoutes(app);


app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})