

// controller ki is listingss file ma routes ma listings file ma jo listing model ka routes hain uska callbacks ko aik aik krka sttore krrwaye ga more details on notes

const { response } = require("express");
const Listing = require("../models/listing");
// requiring mapbox sdk to use
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //geocoding wali service ha jo mapbox sdk ma usa require kia
// requiring access token
const mapToken = process.env.MAP_TOKEN; // map box usi request ko accept kra ga jiska pas acess token hoga so us service ko start krdia by passing our access token
// mapToken ko use krka base client create kra ga 
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
 // ab hamara pas aik geoCodingClient agya Client matlab asi functionality agye jo hama geoCoding ka related kam krka daga 

// so ham na index route ka listing model ma sa uska call back wha sa uthaya usa wha sa cut kia or controller ma yha module.exporta ma aik index name ka function bna dia or is nfunction ma wohi callback likha wha pa bhi ya async route listings ko show kr rha tha yha pa bhi kra ga so wo ab listing routes wali file ab readable hogye ha 
// show route callback
// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// };

module.exports.index = async (req, res) => {
    let { category } = req.query;
    let allListings;
    
    if(category) {
        allListings = await Listing.find({ category });
        if(allListings.length === 0) {
            req.flash("error", `No listings found for category: ${category}`);
            return res.redirect("/listings");
        }
    } else {
        allListings = await Listing.find({});
    }
    
    res.render("listings/index.ejs", { allListings });
};

// search bar route calback
module.exports.search = async (req, res) => {
    let { search } = req.query;

    if (!search || search.trim() === "") {
        req.flash("error", "Please enter something to search!");
        return res.redirect("/listings");
    }

    let allListings = await Listing.find({
        $or: [
            { country:  { $regex: search.trim(), $options: "i" } },
            { location: { $regex: search.trim(), $options: "i" } },
            { title:    { $regex: search.trim(), $options: "i" } },
        ]
    });

    if (allListings.length === 0) {
        req.flash("error", `No listings found for: "${search}"`);
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings });
};

// New Route callback ->that render new form to create listing
module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

// Show Route Callback -> that shows a specific listing to user
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  // getting also all info of owner of listings to show on  single listings
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      }
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for doesnot exist !");//ya 
    res.redirect("/listings");
    return;
  }
  console.log(listing);
  // ya midleware.js file middleware  ma likh rha sab kalia
  res.render("listings/show.ejs", { listing });
};


// Create Route Callback -that takes info from new listing creation form and create a new listing
module.exports.createListing = async (req, res, next) => {
  // req.file as we know req .file ma image jo cloudinary ma store hogi uska pora data hoga joka object form ma hoga jab image create hogi to ya cloudinary ma store hona jaye gi or sath lisitng ma bhi so ham isma sa image ka url or file name nikal laga taka image ka url mongo ma save krwa saka 

  // actuall geocoding krna ka lia
  // code from forward geocoding of github file
  let coordinates  = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
  types: ["place", "locality", "district" , "region"],
})
  .send();

  console.log(coordinates.body.features[0]);
  // res.send("done");
  

  
   
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url ,".." , filename); //jis file ko upload kia usi ka url or file name access ho rha ha 
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  // so jab ham listing ko save krwa rha hain us sa pahla jo newListing save ho rhi ha usma image ka andar ya 2 values add krda ga 
  newListing.image = { url , filename};
  // listing ka andar geoJson format ma jo mapboc sa coordinates arha ha wo store krwa laga 
  newListing.geometry = coordinates.body.features[0].geometry;
  let savedListing =await newListing.save();
  console.log(savedListing);
  req.flash("success", "new Listing Created!");

  res.redirect("/listings");
};


// Edit Route Callback - to edit the existing listing it display the edit form to user with the info of that listing to edit
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for doesnot exist !");
    res.redirect("/listings");
    return;
  }
  // changing quality of preview image on edit form
  let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing , originalImageUrl  });
};


// Update Route Callback - that update the info of that listing for which yser changes in edit form and ssend update request
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  //  agar shi user edit krwa rha ha to update krdo 
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  if(typeof req.file !== "undefined"){
   let url = req.file.path; 
   let filename = req.file.filename;
   listing.image = { url , filename };
   await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`); 2
};


// Delete Route Callback -> delete the listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
};


