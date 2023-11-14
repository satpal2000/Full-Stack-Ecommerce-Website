import express  from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

//configure env 
dotenv.config({path:"config/.env"});

//connection to database
connectDatabase();

//rest object
const app = express();

//esmodeule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoutes);

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

//PORT
const PORT = process.env.PORT || 8080 ;

//run listen
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan.white);
})
