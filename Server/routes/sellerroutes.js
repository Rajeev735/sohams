import express from "express"
import authseller from "../middleware/authseller.js"
import { addproducts, loginseller, registerseller } from "../controller/sellercontroller.js";
import upload from "../middleware/multer.js";
const sellerrouter=express.Router();

sellerrouter.post('/register',registerseller);
sellerrouter.post("/login",loginseller)
sellerrouter.post("/addproducts",upload.array('images', 5), addproducts)


export default sellerrouter;

