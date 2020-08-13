var displayStocks = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"]

for (i = 0; i < displayStocks.length; i++) {
  var mainStockURL = "https://cors-anywhere.herokuapp.com/https://marketdata.websol.barchart.com/getHistory.json?apikey=ab2b64de6529a58b22ffba3b8ceeee0d&symbol=" + displayStocks[i] + "&type=minutes&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true"

  $.ajax({
    url: mainStockURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var stockDiv = $("<div>")
    stockDiv.addClass("card")
    //getting stock name
    var stockName = response.results[i].symbol;
    var symbolP = $("<h5>").text(stockName);

    //getting stock time
    var stockTime = response.results[i].timestamp;
    var timeP = $("<h6>").text(stockTime);

    //getting stock high
    var stockHigh = response.results[i].high;
    var highP = $("<p>").text("High: " + stockHigh);

    // getting stock low
    var stockLow = response.results[i].low;
    var lowP = $("<p>").text("Low: " + stockLow);

    //getting stock open
    var stockOpen = response.results[i].open;
    var openP = $("<p>").text("Open: " + stockOpen);

    //getting stock close
    var stockClose = response.results[i].close;
    var closeP = $("<p>").text("Close: " + stockClose);

    //appending data to stock div
    stockDiv.append(symbolP, timeP, highP, lowP, openP, closeP);

    $(".container-fluid").append(stockDiv)

  });
}


//ajax call for user searched stock
function userStock(symbol) {


  var searchURL = "https://cors-anywhere.herokuapp.com/https://marketdata.websol.barchart.com/getHistory.json?apikey=ab2b64de6529a58b22ffba3b8ceeee0d&symbol=" + symbol + "&type=minutes&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true"

// pulling information from barchart API
  $.ajax({
    url: searchURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    showOnPage(symbol, response)

  });

}

//creating onclick so stocks will show when clicking submit
$("#submitStock").on("click", function () {
  event.preventDefault();
  var stockName = $("#inputValue").val();
  userStock(stockName);
})

//creating function to how searched stock
function showOnPage(symbol, response) {

  var userDiv = $("<div>")
  userDiv.addClass("card")

  // getting Name for user search
  var userStockName = response.results[0].symbol;
  window.userStockName = userStockName

  var userSymbolP = $("<h5>").text(userStockName)

  //getting stock for user search
  var userStockTime = response.results[0].timestamp
  var userTimeP = $("<h6>").text(userStockTime)

  //getting high for user search

  var userStockHigh = response.results[0].high
  var userHigh = $("<p>").text(userStockHigh)

  //getting low for user search

  var userStockLow = response.results[0].low
  var userLow = $("<p>").text(userStockLow)
// getting open reults for user search
  var userStockOpen = response.results[0].open
  var userOpen = $("<p>").text(userStockOpen)
// getting close results for user search
  var userStockClose = response.results[0].close
  var userClose = $("<p>").text(userStockClose)


  userDiv.append(userSymbolP, userTimeP, userHigh, userLow, userOpen, userClose)
  $("#userDiv").append(userDiv)

}


