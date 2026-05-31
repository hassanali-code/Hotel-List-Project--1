

// yha ham apna review model bnaye ga jisma filhal koiu bhi user reviews add kr sakta ha 

const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// notes and explanation on register
const reviewSchma= new Schema({
    comment: String,
    rating: {
        type: Number,
        min:1,
        max:5
    },
    createAt : {
        type:Date,
        default:Date.now() //agar koi bhi review bn rha ha uski date or time set ni hoa to wo jis time pa create hoa hoga wohi uski default date and time set ho jaye gi 
    },
    author : { //review ma authoriza t=]ion ko lagana ka lia ham yaha author bhi define kra ga schema ma taka jis author na isa create kia ha wohi apna review ko delete krsaka ham author ki id review ma store krwaye ga taka koi del krna laga review to usa uski id sa author ki id mila to author hoga wo del kr sakta ha nai to del ni hoga review 
        type : Schema.Types.ObjectId,
        ref:"User",
        // ya author user model ko is lia refer kr rha ha q ka review to lgge d in user hi create kra ga  so uska data user model ma to hoga  jo hamara author hoga so ham yha refer krwa rha hain ka jo user ha usak data user model ma hoga 
    }
});

module.exports = mongoose.model("Review" , reviewSchma);

