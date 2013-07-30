var casper = require("casper").create();
var fs = require("fs");

var url = "http://www.tso.ca/tsoundcheck/default.aspx"
casper.start(url, function() {
  this.waitFor(function check() {
    this.echo("\nChecking the tsoundcheck site...\n");
    return this.getCurrentUrl() == url;

  }, function then() {
    try {
      this.captureSelector("concerts/screenshot.png", "#CheapTickets");
    } catch(CasperError) {
      this.die("\nNo listings found.\n");
    }

    var listingCount = this.evaluate(function() {
      return document.querySelectorAll(".CheapTicketListing").length;
    });
    this.echo(listingCount + " listings found.");

    var ticketPrice = this.getHTML("#CheapTickets h2").trim();

    for (var c = 1 ; c <= listingCount ; c++) {
      var concertNumber = ".CheapTicketListing:nth-of-type(" + c + ") .eventInfo ";

      var titleSelector = concertNumber + ".title";
      var title = this.getHTML(titleSelector).trim().replace(/&amp;/g, '&');

      var perfSelector = concertNumber + ".performances div";
      var performances = this.getHTML(perfSelector).trim();

      var buyTicketsSelector = concertNumber + "a";
      var buyUrl = this.getElementAttribute(buyTicketsSelector, "href");
      var buyUrlComplete = "http://www.tso.ca" + buyUrl;

      var titleFile = "concerts/" + c + "/title.txt";
      fs.write(titleFile, title, 'w');

      var concertDetails = performances + "\n" + ticketPrice;
      var detailsFile = "concerts/" + c + "/performances.txt";
      fs.write(detailsFile, concertDetails, 'w');

      var filename = "concerts/" + c + "/buyUrl.txt";
      fs.write(filename, buyUrlComplete, 'w');
    }

  }, function onTimeout() {
    this.die("URL timed out.", 1);
  });
});

casper.run();

