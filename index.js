const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

require("dotenv").config();
const PORT = process.env.PORT;

//database Connection
const db = require("./server/config/database");

db.authenticate()
.then(() => {
  console.log("Connection to DB has been established successfully.");
})
.catch(err => {
  console.error("Unable to connect to the DB:", err);
});

//-------------------

app.listen(PORT || 5000);
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });    
}

// Get Routes
let signup = require("./server/routes/auth/signup");
let login = require("./server/routes/auth/login");
let file = require("./server/routes/files");
//middlewares
const verifyToken = require("./server/middlewares/auth.middleware").verifyToken;

app.use("/api/auth", signup);
app.use("/api/auth", login);
app.use("/api/file", verifyToken, file);
