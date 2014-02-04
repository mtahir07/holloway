var casper = require("casper").create();
var fs = require("fs");

var url = "http://www.tso.ca/en-ca/tsoundcheck/default.aspx"
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

    for (var c = 1 ; c <= listingCount ; c++) {
      var concertNumber = ".CheapTicketListing:nth-of-type(" + c + ") .eventInfo ";

      var titleSelector = concertNumber + ".title";
      var title = this.getHTML(titleSelector).trim().replace(/&amp;/g, '&');

      var detailsSelector = concertNumber + ".performances div:not(.text)";
      var detailsText = this.fetchText(detailsSelector).trim();
      var priceSelector = concertNumber + ".performances div.text strong";
      var priceText = this.fetchText(priceSelector).trim();
      var timeText = detailsText.replace(priceText, "");

      var buyTicketsSelector = concertNumber + "a";
      var buyUrl = this.getElementAttribute(buyTicketsSelector, "href");
      var buyUrlComplete = "http://www.tso.ca" + buyUrl;

      var titleFile = "concerts/" + c + "/title.txt";
      fs.write(titleFile, title, 'w');

      var concertDetails = timeText + "\n" + priceText;
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

