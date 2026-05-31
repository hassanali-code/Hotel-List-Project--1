
// listing model routes
const express = require("express");
const router= express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema } = require("../schema.js");
// require authenticate middleware to check user logged in or not
const  { isLoggedIn , isOwner ,validateListing} = require("../middleware.js");

// requiring multer to use
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage }); //multer by default hamari files ko cloudinary ki storage ma jaka save krwaye ga





// ab yha pa apna controller ko require krla ga taka use kr saka
// ab apna in routes ka callback wha controller ma is model ki file ma iska callbacks define krka export kra ga or yha use krla ga 
const listingController = require("../controllers/listings.js");

// router.route() method jo same path pa alag alag request arhi ha path ko bar bar alag alag define krna ki bajaye aik bar define krka usma code likh do 

router
  .route("/") 
    .get(  wrapAsync(listingController.index)) // "/" is route pa jab get request aye gi to ya execute hoga
 .post( 
   isLoggedIn, 
   upload.single('listing[image][url]') ,
   validateListing, 
   wrapAsync(listingController.createListing)
  );
   
    router.get("/search", listingController.search);


// new route
  router.get("/new", 
  isLoggedIn , 
  listingController.renderNewForm 
);

router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggedIn ,
    isOwner ,
    upload.single('listing[image][url]') ,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn ,
    isOwner , 
    wrapAsync(listingController.deleteListing));

   // Edit ROUTE 
  //  Edit Route - form to edit an existing listing
router.get("/:id/edit",
   isLoggedIn ,
   isOwner , 
   wrapAsync(listingController.renderEditForm)
  );







module.exports=router;