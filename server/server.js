const express = require("express");
const cors = require("cors");

const app = express();

const {Case} = require("./models/all.model");

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({extended: true}));

app.use(cors());

require("./routes/case.routes")(app);


const port = 8000;
const server = app.listen(port, () => console.log("Ready to roll on port", port));

const io = require("socket.io")(server);

