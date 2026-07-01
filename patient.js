const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
{
    patientName:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    registrationDateTime:{
        type:String,
        required:true
    },

    disease:{
        type:String,
        required:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Patient", patientSchema);