
// controller for users routes callback


const User= require("../models/user");




// Show route Callback that show signup form to user
module.exports.renderSignupForm =  (req , res) =>{
     res.render("./users/signup.ejs");
};


// post route callback of user that allow user to signup
module.exports.signup=  async ( req , res)=>{

    try{
    let { username , email  , password} = req.body;
    const newUser = new User({ email , username});
    const registeredUser=await User.register( newUser , password);
    console.log(registeredUser);
    req.login ( registeredUser ,  (err) =>{  
        if(err){
            return next(err); 
        }
        req.flash("success" , "welcome to wanderlust!");
        res.redirect("/listings");
     });

    }catch(err){
        req.flash("error" , err.message);
        res.redirect("/signup");
    }
   
      
};

// login page route callback -> show login page to user
module.exports.renderloginForm = (req , res)=>{
    res.render("./users/login.ejs");
};


// login user route callback -> that login user in data base
module.exports.login =  async(req , res)=>{
    req.flash("success","Welcome back to Wanderlust! ");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};



// logout route callback -
module.exports.logout = (req , res ,next ) =>{
     req.logout( (err) =>{  
        if(err){
            return next(err); 
        }
        req.flash("success" ,"you are logged out now !");
        res.redirect("/listings");

     })
};