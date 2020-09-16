const express = require('express');

const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const path = require('path');

const auth = require('./routes/auth');

const cors = require('cors');

const app = express();

app.use(bodyparser.json());

app.use(cors());

app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Nishant:Ok123456@@cluster0.oppns.mongodb.net/<dbname>?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err,res)=>{
    if(err)
      console.log(error);
    else
       console.log('connected to the db');
})

app.use(auth);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(process.env.PORT||4000, '0.0.0.0');