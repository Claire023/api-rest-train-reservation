const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//Connexion DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/train', {useNewUrlParser:true}).then(()=>{
    console.log("database connected to mongo DB");
}).catch((e)=>{
    console.log("Error while trying to connect to mongo DB");
});

//prevenir certains warning de depreciation
mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);



//charger les models
const {Train} = require('./db/models/train.js');
const {BookTrain} = require('./db/models/booktrain.js');
const { request } = require('http');


//load middleware
app.use(bodyParser.json());



// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});



//Obtenir la liste des trains 
app.get('/trains', (req,res)=>{
    Train.find({}).then((trains)=>{
       res.status(200).send(trains);
    })
});


//Obtenir la liste des reservations de train
app.get('/booktrains', (req,res)=>{
        BookTrain.
        find({}).populate('currentTrain').then((book_trains)=>{
            res.status(200).send(book_trains);
        })
  
});



//Créer une reservation
app.post('/booktrains',(req,res)=>{
  let currentTrain = req.body.currentTrain;
  let numberPlaces = req.body.numberPlaces;
  let book_train_list = new BookTrain({
      currentTrain,numberPlaces
  });

book_train_list.save().then((book_trains)=>{
    //retourne la liste des reservations
    res.status(200).send(book_trains);
});

});


// //Supprimer un train
// app.delete('/trains/:id', (req,res)=>{
//     Train.findOneAndRemove({
//         _id:req.params.id
//     }).then((removedTrainList)=>{
//         res.status(200).send(removedTrainList);
//     }) 
// });



//Supprimer une reservation
app.delete('/booktrains/:id', (req,res)=>{
    BookTrain.findOneAndRemove({
        _id:req.params.id
    }).then((removedBookingList)=>{
        res.status(200).send(removedBookingList);
    }) 
});



//Trouver une réservation
app.get('/booktrains/:id', (req,res)=>{
 BookTrain.findById({
    _id:req.params.id
 }).then((booking)=>{
     res.send(booking);
 })
 
 })

//port a utiliser pour initialisation serveur en local
app.listen(3000, ()=>{
    console.log('listening on port 3000');
});


