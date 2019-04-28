// Require dependencies
var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");

// Setup port to host designated port or 3000
var PORT = process.env.PORT || 3000;

// Initiate Express app
var app = express();

// Setup Express Router
var router = express.Router();

// Designate public folder as a static directory
app.use(express.static);

// Have each request go through router middleware
app.use(router);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT)
});

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get("https://stackoverflow.com/").then(function(response) {

  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("div.summary").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
