
// isma authentication authorization kra ga or user ka model bnaya ha takla user signup login wagar kra 

// into and notes on register 

const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
// passport-local-mongoose
const passportLocalMongoose = require('passport-local-mongoose');

// user ka scham bna rha ka user 
const userSchema =new Schema({
     email:{
        type:String,
        required:true
     },
    //  username
    // password
    // ab ya fields ham yha is lia define ni kr rha q ka passport-local-mongoose ki jo documentation ha npm website ma uska andar jab bhi ham apna schema ko define krta hain ya mention ha wha
    // You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

    // yani ham apna user model ma koi bhi field add kr sakta hain par passport-local-mongoose by default aik username field khud hi add krda ga hamara user model ma  or sath ka sath aik hash or salt wala field bhi add krda ga to store username yani jo ham na hashing ki or salting ki bat ki thi  un dono ko khud hi automatically passport local mongoose implement krdiata ha hamara lia yani aik automatic salt value store krwa daga hamara user model ma or aik hashed password bhi khud hi save krwa daga

    // so password or username passport-local-mongoose hamara lia automatically  khud hi save krwa daga chaha ham unko field ka andar mention kra chaha na kra so isi lia jab apna user define kra rha hain uska andar ham apna email define kra ga
    
    // so password or username likhna ki need ni q ka jab schema actually data base ka lia create hoga usma wo automatically create hoga(username , password) using password


    //  baqi agar koi field age krni ha name age ki wo bhi yha kr sakta hain 

});

// schema define krna ka bad ham plugin ki trah pass krda ga passportLocalMongoose ko
userSchema.plugin(passportLocalMongoose.default);
// passportLocalMongoose ek ES Module hai jiske andar export default use hua hai. Jab require() se load karte hain, toh woh function direct nahi milta, balki ek object ke andar default naam ki property mein milta hai. Isliye, uss function ko access karne ke liye .default lagana padta hai.


// exporting model schema
module.exports = mongoose.model("User", userSchema);

// passportLocalMongoose ko as a plugin yha isi lia use kia q ka ya automatically username hashing salting and hashpassword ko automatically implement krdiata ha iska sath  passportLocalMongoose kuch methods ko bhi hamara model ma add krda ga 