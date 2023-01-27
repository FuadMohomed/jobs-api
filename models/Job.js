const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
company:{
    type:String,
    required:[true,'please provide company name'],
    maxlength:50
},

position:{
    type:String,
    required:[true,'please provide Position'],
    maxlength:100
},
status:{
    type:String,
    enum:['Interview','Declined','Pending'],
    default:'Pending'
},

createdBy:{
  type:mongoose.Types.ObjectId,
  ref:'User',
  required:[true,'Please Provide User']

}



},{timestamps:true})



module.exports = mongoose.model('Job',JobSchema)