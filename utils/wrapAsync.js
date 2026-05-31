

// ham na ya jo utilis folder bnaya ha isma extra cheeza rakha ga jaisa express error class hogye jo custom error handle krna ka lia use hoti ha async error ko handle krna ka wrapasync method hogya etc


// so yha ham apna async error ko handle krna ka lia wrapAsync bnaye ga 
// yha ham wrapasync function ko aik arrow function bna ka exports kr rha hain 
module.exports= (fn) => {
    return (req , res , next)=>{
        fn(req , res ,next).catch(next);
    }
}