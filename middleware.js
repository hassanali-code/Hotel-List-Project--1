

// listing model ko require krla ga taka data base sa listing ko changes ka lia get kr saka
const Listing= require("./models/listing");
const Review= require("./models/review");

const ExpressError = require("./utils/ExpressError.js");
const {listingSchema ,reviewSchema} = require("./schema.js");
const review = require("./models/review.js");


// midddleware to authenticate if a user is logged in or not

module.exports.isLoggedIn = (req , res , next) => {
   // console.log(req.user); //iski help sa check kr sakta hain ka ham logged in ha ya logged in nai hain 
   // console.log(req);
   console.log(req.path , ".." ,req.originalUrl);

    if(!req.isAuthenticated()){
      // redirect url --- original url details on notes register
      // orginal url ko save krwa laga taka user jis page pa ho wha sa login krka wapis usi page pa jaye 
      req.session.redirectUrl= req.originalUrl;
    req.flash("error" ,"you must be logged in to create listing ");
      res.redirect("/login"); //ka agar login nai ha to phla login krlo
      return;
  }
//   agar user authenticate ha to nexxt aga code ma chala jjaye agla code bhi run ho 
   next();

};


// this middleware purpose is on notes in  Post-login section of project notes
module.exports.saveRedirectUrl = (req , res , next) =>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
   }
   next();
}


module.exports.isOwner =async (req , res , next)=>{
   let {id} = req.params;

   let listing_to_Update=await Listing.findById(id);
     if( !listing_to_Update.owner.equals(res.locals.currentUser._id)) { 
         req.flash("error" ,"You are not the owner of this listing");
          res.redirect(`/listings/${id}`);
          return; 
    }
    next();
};


// Middleware - validate listing data using Joi schema 
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware - validate review data using  reviewJoi schema
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};




module.exports.isReviewAuthor =async (req , res , next)=>{
   let {  id, reviewId } = req.params;
   let review=await Review.findById( reviewId );
     if( !review.author.equals(res.locals.currentUser._id)) { 
         req.flash("error" ,"You are not the Author of this review");
          res.redirect(`/listings/${id}`);
          return; 
    }
    next();
};



