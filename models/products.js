const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type:{
        type : String,
        require:true
    },
    title:{
        type : String,
        require :true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
      type:String,
      require:true
    },
    description:{
       type:String,
       require:true
    },
    date:{
        type:Date,
        require:true
    }
})


const product = mongoose.model('product', productSchema);

module.exports = product;