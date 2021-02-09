const mongoose = require('mongoose');
const { Train } = require('./train');
const {tr} = require('./train');


const BookTrainSchema = new mongoose.Schema({
        
        bookNumber:{type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
        currentTrain:
        {type: mongoose.Schema.Types.ObjectId, ref: 'Train'}
        ,
        numberPlaces:Number
})

const BookTrain = mongoose.model('BookTrain',BookTrainSchema);



module.exports = {BookTrain}


