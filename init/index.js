

// is file ma ham data base initialization ka pora ka pora logic likha ga 


const mongoose=require("mongoose");
// requiring sample data
const initData = require("./data.js");
// requiring model
const Listing=require("../models/listing.js");
const { object } = require("joi");

// Establishing Connection with the Data Base
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
        
main().then(()=>{
      console.log("connected to DataBase");
}).catch((err)=> {
      console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// Dtat base ko initalize krna ka function ha ya 
const initDB= async () =>{
    // phla agar hamari data base ma already koi data  para hoa ha tu usa phla completely clean kra ga 
    await  Listing.deleteMany({}); 
//     adding owner property to all data objects -> more on notes 
    initData.data=initData.data.map((obj) => ({
      ...obj ,
       owner: "6a03945a61222ac2efb13d8a"
      }));
    
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}; 

initDB();