const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required:[true, "Please Provide email"],        
        unique : true
    },
    password : {
        type : String,
        required : [true, "Please Provide Password"],    
    },
    phone : {
        type : String,
        required : true,
        unique : true
    }
})


const User = model("User", userSchema);

module.exports = User;