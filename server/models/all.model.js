const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
    srNumber: String,
    cxName: String,
    subscriptionId: String, //Good for things like Filing ICMs. 
    internalTitle: String,
    // A case has a Case Number (SR#), a customer description, a contactName, a bunch of emails, phoneCalls, notes, 
    
});

const NoteSchema = new mongoose.Schema({
    srNumber: String,
    issueDesc: String,
    businessImpact: String,
    expectedOutcome: String,
    environment: String,
    troubleshooting: String,
    caseStatus: String,
    nextAction: String,
    nextContact: String,
    
});

const EmailSchema = new mongoose.Schema({
    srNumber: String,
    body: String,
});

const StubSchema = new mongoose.Schema({
    srNumber: String,
    body: String
});

const Case = mongoose.model("Case", CaseSchema);
const Note = mongoose.model("Note", NoteSchema);
const Email = mongoose.model("Email", EmailSchema);
const Stub = mongoose.model("Stub", StubSchema);

module.exports = {Case, Note, Email, Stub};