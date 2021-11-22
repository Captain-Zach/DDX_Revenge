const {Pet} = require("../models/all.model");

module.exports.testRun = (req, res) => {
    res.json({message: "Server connected, release the penguins"});
}