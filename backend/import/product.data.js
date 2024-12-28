import fs from "fs"

import Product from "../models/product.model.js"
import {connectDB} from "../db/mongo.db.config.js"

const jsonProducts=JSON.parse(fs.readFileSync('./json/product.json',"utf-8"));
connectDB();

const deleteData=async()=>{
    try{
        await Product.deleteMany();
        console.log('Data Deleted successfully');
    }
    catch(error){
        console.log('Error in deleteData : '+error.message);
    }
    process.exit();
}

const importData=async()=>{
    try{
        await Product.insertMany(jsonProducts);
        console.log('Data Imported successfully');
    }
    catch(error){
        console.log('Error in importData : '+error.message);
    }
    process.exit();
}

if(process.argv[2]==="-d")
    deleteData();
else if(process.argv[2]==="-i")
    importData();

console.log(process.argv);