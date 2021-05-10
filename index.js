const express = require("express");
const path = require("path");
const router = require("./routes/healthtrackerRoute");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const auth = require('./auth/auth');
const session = require('express-session');
const passport = require('passport');
const app = express(); 




app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("mustache", mustache());
app.set("view engine", "mustache");

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

auth.init();

app.use("/", router);

const public = path.join(__dirname, "public");
app.use(express.static(public));


app.use(function (req, res) {
  res.status(404);//anything not handle by the route send err
  res.send("404. Oops! We didn't find what you are looking for.");
  });
  
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000. Ctrl^c to quit.");
  });
