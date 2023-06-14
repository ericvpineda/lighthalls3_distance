const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const localPort = 3000;
const { validate, getHaversineDistance } = require("./utils");

// Allow for layout, partial, block templates
app.engine("ejs", ejsMate);

// Allow for ejs files
app.set("view engine", "ejs");

// Set routes to views folder
app.set("views", path.join(__dirname, "/views"));

// Allow parse url form data
app.use(express.urlencoded({ extended: true }));

// Allow parse json data
app.use(express.json());

let validated_coordinates = [];

// Home page
app.get("/", (req, res) => {
  // Steps:
  // - check if coordinates values exist
  //   - if so, render index page with calculated distance
  //   - else, just render index page

  if (validated_coordinates.length == 0) {
    res.render("index", { distance: null });
  } else {
    // TODO: Get calculated distance
    distance = getHaversineDistance(...validated_coordinates);
    validated_coordinates = [];
    res.render("index", { distance });
  }
});

// Recieve coordinates
// Note: req.body -- get body information from form
app.post("/calculate", (req, res) => {
  // Steps
  // - validate longitude, latitude (float, float)
  //  - edge cases:
  //      - leading/trailing spaces
  //      - non numeric characters
  //      - include decimal for float values

  input_coordinates = [req.body.point1, req.body.point2];
  
  // TODO: validate input
  validated_coordinates = validate(input_coordinates);

  res.redirect("/");
});



app.listen(localPort, () => {
  console.log("Listening on port 3000...");
});
