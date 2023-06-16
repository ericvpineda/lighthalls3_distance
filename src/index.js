const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const PORT = 3000;
const { format_coordinates, getHaversineDistance } = require("../utils");

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

// Serve static files
app.use(express.static(__dirname + '/public'))

let validated_coordinates = [];

// Home page
app.get("/", (req, res) => {
  // Steps:
  // - check if coordinates values exist
  //   - if so, render index page with calculated distance
  //   - else, just render index page

  // Render home page without distance variable
  if (validated_coordinates.length == 0) {
    res.render("index", { distance: null });
  
  // Render home page with distance variable
  } else {
    
    distance = getHaversineDistance(...validated_coordinates);
    
    // Empty coordiantes list
    validated_coordinates = [];
    
    res.render("index", { distance });
  }
});

// POST resquest to recieve 2 locations
// Note: req.body -- get body information from form
app.post("/calculate", (req, res) => {

  // Get coordinates from request
  input_coordinates = [req.body.point1, req.body.point2];
  
  // Assume coordinates are already validated
  validated_coordinates = format_coordinates(input_coordinates);

  res.redirect("/");
});


app.listen(PORT, () => console.log("Listening on port 3000..."));
