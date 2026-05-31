
// ab review wala routes or code ko yha resetructure kra ga 
const express = require("express");
// const router= express.Router();
const router = express.Router({ mergeParams: true });
// parent file yani app.js ma jo request ma jo id ati ha wo is file ma bhi aye uska lia ham routerobject ka ya parameter use krta haion
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema} = require("../schema.js");
// const reviewSchema = require("./schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// requirng validate review middleware to validate reviews 
const { validateReview, isLoggedIn , isReviewAuthor } = require("../middleware.js");

// to use callback for routes
const reviewController = require("../controllers/reviews.js");









// Reviews --Section
// Review Creation route
router.post("/",
     isLoggedIn, 
     validateReview, 
     wrapAsync(reviewController.createReview));


//  Review Deletion Route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));


module.exports = router;

