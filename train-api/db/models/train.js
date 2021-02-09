const mongoose = require('mongoose');


const TrainSchema = new mongoose.Schema({
        numTrain:String,
        villeDepart:String,
        villeArrivee:String,
        heureDepart:Number

})

const Train = mongoose.model('Train',TrainSchema);


   
module.exports = {Train}






