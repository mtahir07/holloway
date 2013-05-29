var casper = require("casper").create();
var fs = require("fs");

var url = "http://www.tso.ca/tsoundcheck/default.aspx"

casper.start(url, function() {
  this.waitFor(function check() {
    return this.getCurrentUrl() == url;
  }, function then() {
    var titleSelector = ".CheapTicketListing .eventInfo .title";
    var title = this.getHTML(titleSelector).trim();
    var perfSelector = ".CheapTicketListing .eventInfo .performances div";
    var performances = this.getHTML(perfSelector).trim();
    var ticketPrice = this.getHTML("#CheapTickets h2").trim();

    this.echo(title);
    this.echo(performances);
    this.echo(ticketPrice);

    var buyUrl = this.evaluate(function() {
      var buyTicketsSelector = ".CheapTicketListing .eventInfo a";
      return __utils__.findOne(buyTicketsSelector).getAttribute("href");
    });
    var buyUrlComplete = "http://www.tso.ca" + buyUrl;

    var filename = "buyTicketUrl.txt";
    fs.write(filename, buyUrlComplete, 'w');

  }, function onTimeout() {
    this.echo("URL timed out.");
  });
});

casper.run();

