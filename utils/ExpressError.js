

// Custom ERxpressError

// ham alag alaga error ka responses ko alag alag messages alag alag status code ka sath send kr skat hain  to usa is way ma send kr rha hoga project ma

// class ExpressError extends Error {

//      Constructor(statusCode , message) {
//         super();
//         this.statusCode= statusCode;
//         this.message= message;

//      }
// };

class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}


module.exports=ExpressError;