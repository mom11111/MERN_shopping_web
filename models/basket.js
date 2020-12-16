const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    productIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

const basket = mongoose.model('bakset', basketSchema);

module.exports = basket;