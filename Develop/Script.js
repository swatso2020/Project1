// Array for button
// const ticker = ['AAPL', 'MSFT', 'AMZN', 'FB', 'NFLX', 'MCD', 'LMT', 'T', 'KO']


let ticker = JSON.parse(localStorage.getItem('btnArray') ?? 'null');
if (!ticker) {
  ticker = [
    {
      name: 'Apple',
      symbol: 'AAPL',
    },
    {
      name: 'Microsoft',
      symbol: 'MSFT',
    },
    {
      name: 'Amazon',
      symbol: 'AMZN',
    },
    {
      name: 'Facebook',
      symbol: 'FB',
    },
    {
      name: 'Netflix',
      symbol: 'NFLX',
    },
    {
      name: 'McDonald\'s',
      symbol: 'MCD',
    },
    {
      name: 'Disney',
      symbol: 'DIS',
    },
    {
      name: 'AT&T',
      symbol: 'T',
    },
    {
      name: 'Coca-Cola',
      symbol: 'KO',
    },

  ]
}


let currentData

// API Key
//Prod
const apiKey = 'pk_7f795028e20d4cf2b689fb66874abd4f'
// Sandbox
// const apiKey = 'Tsk_45ffeac63611476c81c288bde56d0f59'
//BarChart Key
// const barChartKey = 'b2cca79db102d031845f0718a36ad9a2'
const barChartKey = '247b0fb0737eb61a2ecf9faf065061e6'
// const barChartKey = 'ab2b64de6529a58b22ffba3b8ceeee0d'

//count
const newsCount = 10

//Environments
const env = 'cloud'
// const env = 'sandbox'

// pull stock from IEX api
function stockIex(ticker) {
  const stockQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker}/book?token=${apiKey}`

  $.ajax({
    url: stockQueryURL,
    method: "GET"
  }).then(function (response) {
    currentData = response
    console.log(response);
    generateStock(response);
  });
}

// pull News from IEX Api.
function newsIex(ticker) {
  const newsQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker}/news/last/${newsCount}?token=${apiKey}`

  $.ajax({
    url: newsQueryURL,
    method: "GET"
  }).then(function (response) {
    generateNews(response);
  });
}

// pull chart from IEX Api
function chartIex(ticker) {
  const chartQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker}/batch?types=quote,chart&range=1m&last=5&token=${apiKey}`
  $.ajax({
    url: chartQueryURL,
    method: "GET"
  }).fail(function(){
    $('.alert').show()
  }).then(function (response) {
    console.log(response)
    generateChart(response);
  });

}

//Open & Close from BarChart.
function barChartOpenClose(ticker) {
  const barChartQueryURL = `https://marketdata.websol.barchart.com/getQuote.json?apikey=${barChartKey}&symbols=${ticker}&fields=fiftyTwoWkHigh%2CfiftyTwoWkHighDate%2CfiftyTwoWkLow%2CfiftyTwoWkLowDate`
  $.ajax({
    url: barChartQueryURL,
    method: "GET"
  }).then(function (response) {
    console.log('barchart');
    console.log(response);
    barChart(response);

  });
}

function generateNews(data) {
  data = data.filter(x => x.lang === 'en')
  console.log(data);

  let tbody = $('tbody')
  tbody.html('')

  for (i = 0; i < data.length; i++) {
    let date = moment(data[i].datetime).format('MMM DD, YYYY @ HH:mm:ss');
    // let time = moment(data[i].datetime).format('HH:mm:ss');
    let headline = data[i].headline;
    let summary = data[i].summary;
    let link = data[i].url;

    //createing elements
    let tableRow = $('<tr>').addClass('row');
    let tableDateTime = $('<td>').addClass('col-sm-2 col-12 font-weight-bold').css("color","white");
    let tableHeadline = $('<td>').addClass('col-sm-3 col-12').css("color","white");
    let tableHeadlineLink = $('<a>').attr('href', link).attr('target', '_blank').text(headline)
    let tableSummary = $('<td>').addClass('col-sm-7 col-12').css("color","white");
    //setting inner text to table
    tableDateTime.text(date);
    // tableHeadline.text(headline);
    tableHeadline.append(tableHeadlineLink)
    tableSummary.text(summary);
    //appening to table row
    tableRow.append(tableDateTime);
    tableRow.append(tableHeadline);
    tableRow.append(tableSummary);
    //append to table body
    tbody.append(tableRow);
  }
}

function generateStock(data) {

  let cardBody = $('#stockInfoCard')

  let stockName = $('<h5>');
  stockName.text(data.quote.companyName);
  let stockPrice = $('<h3>');
  stockPrice.text(data.quote.latestPrice);
  let primaryExchange = $('<div>');
  primaryExchange.text('Exchange: ' + data.quote.primaryExchange);
  let closetime = $('<div>')
  let time = data.quote.closeTime
  closetime.text('Closed: ' + moment(time).format('MMM DD, hh:mmA'))

  cardBody.append(stockName, stockPrice, primaryExchange, closetime);


}

function generateChart(data) {
  var stockName = data.quote.companyName
  var points = []
  for (var i = 0; i < data.chart.length; i++) {
    var day = data.chart[i].date
    var begin = data.chart[i].open
    var close = data.chart[i].close
    var high = data.chart[i].high
    var low = data.chart[i].low

    points.push([
      new Date(day),
      begin,
      close,
      high,
      low
    ])
  }
  var chart = JSC.chart('chartDiv', {
    debug: true,
    type: 'line',
    defaultPoint_marker: {size: 2},
    legend: {
      template: '%icon %name',
      position: 'inside top left'
    },
    yAxis_formatString: 'c',
    xAxis_crosshair_enabled: true,

    series: [
      {
        name: stockName,
        points: points
      }
    ]
  });

}

function generateButtons() {

  let divBody = $('#stockButton');
  divBody.html('')
  let list = $('<ul>').addClass('list-group list-group-horizontal row');
  for (let i = 0; i < ticker.length; i++) {
    let stockName = $('<li>').addClass('list-group-item border-left col-4').css({"background-color": "#f8f8ff","display": "flex", "border-radius":"7px","flex-wrap:":"wrap","height": "50px","margin": "0px 3px 3px 0px","justify-content": "space-around","flex": "0 0 32%","cursor": "pointer"});
    stockName.text(ticker[i].name);
    stockName.attr('data-symbol', ticker[i].symbol)

    stockName.click(function () {
      getData(this.dataset.symbol);
    })

    list.append(stockName)
  }
  divBody.append(list)
}

let searchBtn = $('#searchBtn');
let saveBtn = $('#saveBtn');

function search() {
  let searchValue = $('#inputText').val()
  getData(searchValue);
}

function getData(symbol) {
  $('#stockInfoCard').html('');
  $('#chartDiv').html('');
  newsIex(symbol);
  stockIex(symbol);
  chartIex(symbol);
  barChartOpenClose(symbol);
}


searchBtn.click(search);
saveBtn.click(updateArray);

generateButtons();

function updateArray() {
  let symbol = currentData.quote.symbol
  let name = currentData.quote.companyName
  let found = ticker.find(x => symbol === x.symbol);
  if (found) return
  found = {}
  ticker.unshift(found);
  found.symbol = symbol
  found.name = name

  if (ticker.length > 9) {
    ticker.splice(ticker.length - 1, 1)
  }
  generateButtons()
  localStorage.setItem('btnArray', JSON.stringify(ticker));

}

function barChart(data) {

  let cardBody = $('#stockInfoCard')
  let stockOpen = 'Open: ' + data.results[0].open;
  let stockClose = 'Close: ' + data.results[0].close;
  let openStock = $('<div>').addClass('font-weight-bold');
  openStock.append(stockOpen);
  let closeStock = $('<div>').addClass('font-weight-bold');
  closeStock.append(stockClose);

  cardBody.append(openStock, closeStock);


}

// JSC.Chart('chartDiv', {});
