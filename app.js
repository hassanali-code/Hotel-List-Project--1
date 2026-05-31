

if(process.env.NODE_ENV != "production"){ 
  require('dotenv').config();

}

const MongoStore = require("connect-mongo").default || require("connect-mongo");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const ExpressError = require("./utils/ExpressError.js");

const Review = require("./models/review.js");
// require listing routes
const listingRoutes = require("./routes/listing.js");
// require review routes
const reviewRoutes = require("./routes/review.js");
// requiring session to use
const session = require("express-session");
// requiring connect flash
const flash = require("connect-flash");
// requiring passport for authentication setup
const passport = require("passport");
// requiring local strategy 
const LocalStrategy = require("passport-local");
// requiring user model for authentication
const User = require("./models/user.js");


const userRoutes = require("./routes/user.js");



const dbUrl = process.env.RailwayDB_URL;


main()
  .then(() => {
    console.log("connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
   await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());


const sessionOptions = {
  store: MongoStore.create({
    mongoUrl: process.env.RailwayDB_URL,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};




// to use express-session
app.use(session(sessionOptions));
// // using connect-flash
app.use(flash());

// using passport initializer which is a middleware that initialize passport when a request came on sever
app.use(passport.initialize());
app.use(passport.session()); // its details on notes
// using passport 
passport.use(new LocalStrategy(User.authenticate()));


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());












// flash messages middleware 
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  // currentuser yani jis user ka session chal rha 
  next();
});

// Demo User -- ab ham aik demo user create kra ga 
app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "student@gmail.com",
    username: "delta student",
  });
  // syntax
  // User.register( User , User password , callback);
  let registeredUser = await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
});


// using listing routes
app.use("/listings", listingRoutes);
// using review routes
app.use("/listings/:id/reviews", reviewRoutes);
// using user routes
app.use("/", userRoutes);





// 404 handler - no route matched
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

// Global error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some error occured" } = err;
  res.status(statusCode).render("error.ejs", { err });
});



app.listen(8080, () => {
  console.log("server is listening to port 8080");
});