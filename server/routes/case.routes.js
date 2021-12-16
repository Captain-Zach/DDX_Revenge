const CaseController = require("../controllers/case.controller");

module.exports = app => {
    app.get("/testRun/", CaseController.testRun);

    app.post("/api/newCase/", CaseController.createCase);
    app.get("/api/findCases/", CaseController.findCases);
    app.post("/api/deleteCase/", CaseController.deleteCase);
    app.post("/api/createEmail/", CaseController.createEmail);
    app.post("/api/createNote/", CaseController.createNote);
    app.post("/api/createStub/", CaseController.createStub);
    app.post("/api/caseStubs/", CaseController.caseStubs);
    // below here be dragons
    app.post("/api/latestEmail/", CaseController.latestEmail);
    app.post("/api/latestNote/", CaseController.latestNote);
    app.post("/api/updateCase/", CaseController.updateCase);
    app.post("/api/findCase/", CaseController.findCase);
};