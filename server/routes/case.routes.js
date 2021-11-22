const CaseController = require("../controllers/case.controller");

module.exports = app => {
    app.get("/testRun/", CaseController.testRun);
};