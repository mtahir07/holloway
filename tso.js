var casper = require("casper").create();
var fs = require("fs");

var url = "http://www.tso.ca/tsoundcheck/default.aspx"

casper.start(url, function() {
  this.waitFor(function check() {
    this.echo("Checking the tsoundcheck site...\n");
    return this.getCurrentUrl() == url;
  }, function then() {
    this.captureSelector("concert/screenshot.png", "#CheapTickets");
    var titleSelector = ".CheapTicketListing .eventInfo .title";
    var title = this.getHTML(titleSelector).trim();
    var perfSelector = ".CheapTicketListing .eventInfo .performances div";
    var performances = this.getHTML(perfSelector).trim();
    var ticketPrice = this.getHTML("#CheapTickets h2").trim();

    var buyUrl = this.evaluate(function() {
      var buyTicketsSelector = ".CheapTicketListing .eventInfo a";
      return __utils__.findOne(buyTicketsSelector).getAttribute("href");
    });
    var buyUrlComplete = "http://www.tso.ca" + buyUrl;

    var nameFile = "concert/title.txt";
    fs.write(nameFile, title, 'w');

    var concertDetails = performances + "\n" + ticketPrice;
    var detailsFile = "concert/details.txt";
    fs.write(detailsFile, concertDetails, 'w');

    var filename = "concert/buyUrl.txt";
    fs.write(filename, buyUrlComplete, 'w');

  }, function onTimeout() {
    this.die("URL timed out.", 1);
  });
});

casper.run();

