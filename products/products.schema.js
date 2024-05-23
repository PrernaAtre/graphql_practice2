const {Schema,model}=require('mongoose')

const productSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    review : {
        type : [],
        required : true
    }
})

const Product = model("Product", productSchema);

module.exports = Product;