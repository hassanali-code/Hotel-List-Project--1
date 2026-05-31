

// yha ham JOI tool ko use krka model ka schema bnaye ga jo server side validation kra ga or model ka schem,a ko validate kra ga 

// requiring JOI

const Joi=require("joi");

// ab yha par schema define kra ga jis schema ko hama validate krna ha 


const listingSchema=Joi.object({ //joi ka andar hamara pas aik object aye or us object ka name listing hoga //listing name ki object ma kuch kuch or parameters hoga 
    listing :Joi.object({ //yani listing name ki object ma kia kia hoga schema ka andar ya jo listing object ha ya joi.object yani joi ka according honi chaia schema validation ka according aik object honi chaia or ya  required honi chaia required khna ka matlab ha hamari ya listing object hamadsha jab bhi koi request aye hamara pas uska andar aik listing name ki object honi hi honi chaia hamara pas 

        // is listing object ma jo jo parameter rakhana ha wo rakha ga yha par 
        title :Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),//hamari price minimum value 0 ho
        // image:Joi.string().allow("", null), //hamari jo image ha usma ham empty string bhi bhj sakta hain or null value bhi yani image post nai bhi kr sakta ha apni listing object list krta waqt website pa 
        image: Joi.object({
           url: Joi.string().allow("", null)
        }),
        category: Joi.string()   // ← ye add karein
            .valid("Trending", "Rooms", "Iconic cities", "Mountains", 
                   "Castles", "Amazing Pools", "Camping", "Farms", "Arctic")
            .required(),

    }).required(),
});

// or ab is schema ko export krda ga 
// module.exports=listingSchema;


// making schema 
 const reviewSchema= Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
});

module.exports = { listingSchema, reviewSchema };