// settings
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "tmp_uploads" });
const mysql = require("mysql");
const moment = require("moment-timezone");
const session = require("express-session");
const cors = require("cors");

const db = mysql.createConnection({
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", // for mac
  host: "localhost",
  user: "root",
  password: "root",
  database: "n_66"
});
db.connect();
const app = express();

const whitelist = ["http://localhost:3000", undefined, "http://localhost:3001"];
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use("/static", express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// login
// app.use(
//   session({
//     saveUninitialized: false,
//     resave: false,
//     secret: "i123oidoajd",
//     cookie: {
//       maxAge: 1200000
//     }
//   })
// );

const login = require("./login/login");
app.use(login);

// member
const register = require("./login/register");
app.use(register);

const members = require("./members/members");
app.use(members);

const members_upload_file = require("./members/members_upload_file");
app.use(members_upload_file);

const members_edit = require("./members/members_edit");
app.use(members_edit);

const members_change_password = require("./members/members_change_password");
app.use(members_change_password);

const members_order = require("./members/members_order");
app.use(members_order);

const members_comments = require("./members/members_comments");
app.use(members_comments);

const members_comments_list = require("./members/members_comments_list");
app.use(members_comments_list);

// comments
const comments = require("./comments/comment");
app.use(comments);

// trips
const trips = require("./trips/trips");
app.use(trips);

//products
const products = require("./products/products");
app.use(products);

// 404
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Can not found page");
});

// Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get Token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     //Forbidden
//     res.json("forbidden");
//   }
// }

app.listen(3001, function() {
  console.log("server 3001 started");
});
