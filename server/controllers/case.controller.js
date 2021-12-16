const {Case, Note, Email, Stub} = require("../models/all.model");

module.exports.testRun = (req, res) => {
    // console.log("Test has run");
    res.json({message: "Server connected, release the penguins"});
}

module.exports.createCase = (req, res) => {
    // console.log(req.body);
    // res.json({message: "Thanks!"});
    Case.create(req.body)
        .then( newCase => res.json({newCase: newCase}))
        .catch(err => res.json({message: "Something went wrong, ya yoot the goose.", error: err}));
}

module.exports.findCases = (req, res) => {
    // console.log(req.body);
    Case.find()
        .then(allCases => res.json(allCases))
        .catch(err=> res.json({message: "Something went wrong", err}));
}


module.exports.deleteCase = (req, res) => {
    // console.log(req.body);
    
    Case.deleteOne({ srNumber: req.body.target})
        .then(result => res.json(result.data))
        .catch(err => console.log(err));
}

module.exports.createEmail = (req, res) => {
    // console.log(req.body);

    Email.create({...req.body})
        .then(result => res.json({result}))
        .catch(err => console.log(err));
}

module.exports.createNote = (req,res) => {
    // let date = new Date();
    // req.body = {
    //     ...req.body,
    //     date: date.now()
    // }
    // console.log("Create Note", req.body);

    
    Note.create(req.body)
        .then(result => res.json({message: result}))
        .catch(err => console.log(err));
}

module.exports.createStub = (req, res) => {
    // console.log(req.body);

    Stub.create(req.body)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

module.exports.caseStubs = (req, res) => {
    // console.log(req.body);

    Stub.find({srNumber: req.body.target})
        .then(stubs => res.json(stubs))
        .catch(err => console.log(err));
}

// Below here be dragons

module.exports.latestEmail = (req, res) => {
    // console.log(req.body); 
    // This one works. It finds all the emails first, sorts them, then
    // takes the most recent.
    Email.find({ srNumber: req.body.srNumber}).sort({_id: -1}).limit(1)
        .then(email => res.json(email))
        .catch(err => console.log(err));
}

module.exports.latestNote = (req, res) => {
    // console.log(req.body);

    Note.find({ srNumber: req.body.srNumber}).sort({_id: -1}).limit(1)
        .then(note => res.json(note))
        .catch(err => console.log(err));
}

module.exports.updateCase = (req, res) => {
    // console.log(req.body);

    Case.findOneAndUpdate({ srNumber: req.body.srNumber}, req.body, { new: true})
        .then(updatedCase => res.json({case: updatedCase}))
        .catch(err => res.json({message:"Something went wrong!", error:err}));
}

module.exports.findCase = (req, res) => {
    console.log("findCase: ", req.body);

    Case.findOne({srNumber: req.body.srNumber})
        .then(result => res.json({case: result}))
        .catch(err => res.json({message:"Something went wrong", error:err}));
}