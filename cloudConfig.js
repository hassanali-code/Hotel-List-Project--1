
// isma sara configuration ka part kra ga 

const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const CloudinaryStorage = cloudinaryStorage.CloudinaryStorage;


// require krna ka bad configure krna hota ha cheezo ko 
// ya code hama multer-storage-cloudinary ki documentation ma dekh jaye ga 
// kisi cheeze ko configue krna ka matlab hota ha cheezo ko jorna 

cloudinary.config({
    // isma ham configuration detials pass krta hain 
    // so hamara backend ko cloudinary account sa jorna ka lia kia kia informatiojn chia hogi 
    // hama yha wo information chaia hogi jo .env file ka andar saved ha 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET,
});

// yha ham apna storage ko apna lia define kra ga 
// storage khna ka matlab google drive pa apna aik folder bna lia jiska andar ap files ko upload kr sakta hain
// so ham yha bata rha ka apna cloudinary account ma kha pa jaka store krna ha files ko
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats : ["png" ,"jpg" ,"jpeg"] ,
  },
});


module.exports = {
    cloudinary ,
    storage ,
}

// ham inhe export krka listing .js file ma use kra ga 
