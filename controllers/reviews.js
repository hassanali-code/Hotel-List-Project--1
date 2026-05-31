

// review routes ka callback define ha yaha



const Review= require("../models/review");
// listing ma review create hoga so listing model bhi use hoga
const Listing= require("../models/listing");



// create Review Route Callback---is route sa review create hoga 
module.exports.createReview= async (req, res) => {

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    //  jab new review create hoga to jisna usa create kia ha usa bhi review ma add kra ga ka ya is review ka author ha as 
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    req.flash("success", "new Review Created!");
    res.redirect(`/listings/${listing._id}`);


};


// Review Delete Route CallBack 
module.exports.deleteReview= async (req, res) => {
     let { id, reviewId } = req.params;
     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
     await Review.findByIdAndDelete(reviewId); 
     req.flash("success", "Review Deleted!");
     res.redirect(`/listings/${id}`);
    }