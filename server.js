var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 2014;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "public/survey.html"));
});


var characters=[]

//Search
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
       return res.json(characters[i]);
      }
    }
    return res.json(false);
  }
  return res.json(characters);
});

//new people local
app.post("/api/new", function(req, res) {
  var newPerson = req.body;
  newPerson.routeName = newPerson.Name.replace(/\s+/g, "").toLowerCase();

  console.log(newPerson);

  characters.push(newPerson);

  res.json(newPerson);
});





app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});