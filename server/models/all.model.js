const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
    srNumber: String,
    // A case has a Case Number (SR#), a customer description, a contactName, a bunch of emails, phoneCalls, notes, 
    
})

const Case = mongoose.model("Case", CaseSchema);

module.exports = {Case};