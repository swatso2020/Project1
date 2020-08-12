
var displayStocks=["AAPL","GOOGL","AMZN","MSFT","TSLA"]

for (i=0;i<displayStocks.length;i++) {
  var mainStockURL="https://cors-anywhere.herokuapp.com/https://marketdata.websol.barchart.com/getHistory.json?apikey=ab2b64de6529a58b22ffba3b8ceeee0d&symbol="+displayStocks[i]+"&type=minutes&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true"

$.ajax({
     url: mainStockURL,
     method: "GET"
   }).then(function(response) {
       console.log(response);
       
       var stockDiv=$("<div>")
       stockDiv.addClass("card")
        //getting stock name
        var stockName=response.results[i].symbol;
        var symbolP = $("<h5>").text(stockName);

          //getting stock time 
          var stockTime=response.results[i].timestamp;
          var timeP=$("<h6>").text(stockTime);

          //getting stock high
          var stockHigh= response.results[i].high;
          var highP= $("<p>").text("High: " + stockHigh);

          // getting stock low
          var stockLow= response.results[i].low;
          var lowP=$("<p>").text("Low: " + stockLow);

            //getting stock open 
            var stockOpen=response.results[i].open;
            var openP=$("<p>").text("Open: " + stockOpen);

            //getting stock close
            var stockClose=response.results[i].close;
            var closeP=$("<p>").text("Close: " + stockClose);

         //appending data to stock div
          stockDiv.append(symbolP, timeP, highP, lowP, openP, closeP);

          $(".container-fluid").append(stockDiv)
    
   });
}

   
   //ajax call for user searched stock
   function userStock(symbol){

    
    var searchURL="https://cors-anywhere.herokuapp.com/https://marketdata.websol.barchart.com/getHistory.json?apikey=ab2b64de6529a58b22ffba3b8ceeee0d&symbol="+symbol+"&type=minutes&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true"



// pulling information from barchart API
    $.ajax({
     url: searchURL,
     method: "GET"
   }).then(function(response) {
       console.log(response);
  showOnPage(symbol,response)
  });
   
}


var stockCaller

//creating function to how searched stock
function showOnPage(symbol, response) {

  var userDiv=$("<div>")
    userDiv.addClass("card")
    
    // getting Name for user search
  var userStockName = response.results[0].symbol;
  var userSymbolP=$("<h5>").text(userStockName)

  //getting stock for user search
  var userStockTime=response.results[0].timestamp
  var userTimeP=$("<h6>").text(userStockTime)

    //getting high for user search

  var userStockHigh=response.results[0].high
    var userHigh=$("<p>").text(userStockHigh)

      //getting low for user search

    var userStockLow=response.results[0].low
    var userLow=$("<p>").text(userStockLow)
// getting open reults for user search
      var userStockOpen=response.results[0].open
      var userOpen=$("<p>").text(userStockOpen)
// getting close results for user search
      var userStockClose=response.results[0].close
      var userClose=$("<p>").text(userStockClose)


  userDiv.append(userSymbolP,userTimeP,userHigh,userLow,userOpen,userClose)
  $("#userDiv").append(userDiv)

  

// stockCaller = response.results[0].symbol;
// return symbol
 }


//creating onclick so stocks will show when clicking submit
$("#submitStock").on("click",function(){
  event.preventDefault();
  var stockName=$("#inputValue").val();
  userStock(stockName);


})















// // Array for button
// const tickers = ['AAPL', 'MSFT', 'AMZN', 'FB', 'NFLX']

// // API Key
// // const apiKey = 'pk_7f795028e20d4cf2b689fb66874abd4f'
// const apiKey = 'Tsk_45ffeac63611476c81c288bde56d0f59'
// const newsCount = 10
// // const env = 'cloud'
// const env = 'sandbox'
// const newsQueryURL = `https://${env}.iexapis.com/stable/stock/${symbol}/news/last/${newsCount}?token=${apiKey}`


// // pull News from IEX Api.
// $.ajax({
//   url: newsQueryURL,
//   method: "GET"
// }).then(function (response) {
//   generateNews(response);

// });

// function generateNews(data) {
//   data = data.filter(x => x.lang === 'en')
//   console.log(data);

//   let tbody = $('tbody')

//   for (i = 0; i < data.length; i++) {
//     let date = moment(data[i].datetime).format('MMM DD, YYYY @ HH:mm:ss');
//     // let time = moment(data[i].datetime).format('HH:mm:ss');
//     let headline = data[i].headline;
//     let summary = data[i].summary;
//     let link = data[i].url;

//   //createing elements
//     let tableRow = $('<tr>').addClass('row');
//     let tableDateTime = $('<td>').addClass('col-sm-2 col-12 font-weight-bold');
//     let tableHeadline = $('<td>').addClass('col-sm-3 col-12');
//     let tableHeadlineLink = $('<a>').attr('href', link).attr('target', '_blank').text(headline)
//     let tableSummary = $('<td>').addClass('col-sm-7 col-12');
//   //setting inner text to table
//     tableDateTime.text(date);
//     // tableHeadline.text(headline);
//     tableHeadline.append(tableHeadlineLink)
//     tableSummary.text(summary);
//   //appening to table row
//     tableRow.append(tableDateTime);
//     tableRow.append(tableHeadline);
//     tableRow.append(tableSummary);
//   //append to table body
//     tbody.append(tableRow);


//   }
//   // let time = data.

// }
