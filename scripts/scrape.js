// To make a successful scrape require:
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");


// Making a request via Axios
// axios.get("https://stackoverflow.com/").then(function(response) {

// Making a request via Cheerio?
request("https://stackoverflow.com/", function(err, response, body) {


  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(body);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("div.summary").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text().trim();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).find("a").attr("href").trim();

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

module.exports = scrape;