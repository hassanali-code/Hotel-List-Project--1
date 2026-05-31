
 
const express = require("express");
const router = express.Router();
// requiring user model
const User = require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
// requiring users route callbacks
const userController=require("../controllers/users.js");

// show route that shows user signup form
router.get("/signup" , userController.renderSignupForm ); 

// post route for signup
router.post("/signup" , wrapAsync(userController.signup));



// showw login page
router.get("/login" , userController.renderloginForm );


// login user
router.post( "/login" , saveRedirectUrl , 
    passport.authenticate("local" , {
         failureRedirect: '/login' ,
          failureFlash :true 
         } ) ,
         userController.login
   );


// logout user route -- is route pa jab request aye gi to ham user ko logout krda ga passport ka req.logout() method sa 

router.get("/logout" , userController.logout);

module.exports = router;