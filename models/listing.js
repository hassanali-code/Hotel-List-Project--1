
// ham jo web project bna rha hain uska model ka schema or model define kra ga yha 
const mongoose = require("mongoose");

const Schema = mongoose.Schema; //ab q ka hama bar bar mongoose.Schema na likhna para isi lia  isko aik variable ma likh lia


// schema of  listing model --- is model ma ham na asa schema bnaya ha jaisa agar kisi na apna hotel  house flat booking ya rent krna ha to is website pa list kr paye 
const listingSchema= new Schema({
    title:{
      type: String,
      required:true
    },
    description:{
        type:String
    },
    // image:{
    //     type:String,
    //     set : (v) => v ==="" ? "https://static.vecteezy.com/system/resources/thumbnails/060/843/811/small/close-up-of-raindrops-on-leaves-hd-background-luxury-hd-wallpaper-image-trendy-background-illustration-free-photo.jpg" :v, //using turnery operater on call back function ka agar user na koi image enter nai ki ha agar image ma user na koi image nai dali or na hi kisi image ka url dala to image empty ha  to defualt  link wali image chala do nai to user na jo image enter ki ha ya uska Url  dia ha wo show krdo
    //     default:"https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"//jab user koi image daga hi nai tab ya wali image show hogi opar wwa;la tab hoga jab user koi image daga par wo empty hogi
    // },
    image: {
      url: String,
  filename: String,
  
},
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"
      }
    ],
    // owner property for creating listing owners so some one cannot delet posts that posted by other    user more details are on notes register
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // coordinates : {
    //   type : [ Number],
    //   required : true
    // }
    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic cities", "Mountains", 
           "Castles", "Amazing Pools", "Camping", "Farms", "Arctic" , "Domes" , "Boats"],
    default: "Trending"
}
});


const review=require("./review.js");
listingSchema.post("findOneAndDelete" , async (listing) =>{
  if(listing){ //agar koi listing del hoi uska data aya to 
    await review.deleteMany({_id : {$in : listing.reviews}}); //review 
  }
});

// making model from this schema
const Listing=mongoose.model("Listing" , listingSchema);


module.exports=Listing; //to use this model in server file we export this