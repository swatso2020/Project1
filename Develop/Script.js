// Array for button
// const ticker = ['AAPL', 'MSFT', 'AMZN', 'FB', 'NFLX', 'MCD', 'LMT', 'T', 'KO']
const ticker = [
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
    name: 'Nextflix',
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
    name: 'Coco-Cola',
    symbol: 'KO',
  },

]


// API Key

// const apiKey = 'pk_7f795028e20d4cf2b689fb66874abd4f'
const apiKey = 'Tsk_45ffeac63611476c81c288bde56d0f59'

const newsCount = 10

//Environments
// const env = 'cloud'
const env = 'sandbox'

const newsQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker[2]}/news/last/${newsCount}?token=${apiKey}`

const stockQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker[0]}/book?token=${apiKey}`


// pull stock from IEX api
function stockIex(ticker) {
  const stockQueryURL = `https://${env}.iexapis.com/stable/stock/${ticker}/book?token=${apiKey}`

  $.ajax({
    url: stockQueryURL,
    method: "GET"
  }).then(function (response) {
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
    let tableDateTime = $('<td>').addClass('col-sm-2 col-12 font-weight-bold');
    let tableHeadline = $('<td>').addClass('col-sm-3 col-12');
    let tableHeadlineLink = $('<a>').attr('href', link).attr('target', '_blank').text(headline)
    let tableSummary = $('<td>').addClass('col-sm-7 col-12');
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

}

function generateButtons() {

  let divBody = $('#stockButton');
  divBody.html('')
  let list = $('<ul>').addClass('list-group list-group-horizontal row');
  for (let i = 0; i < ticker.length; i++) {
    let stockName = $('<li>').addClass('list-group-item border-left col-4');
    stockName.text(ticker[i].name);
    stockName.attr('data-symbol', ticker[i].symbol)

    stockName.click(function () {
      newsIex(this.dataset.symbol);
      stockIex(this.dataset.symbol);
    })

    list.append(stockName)
  }
  divBody.append(list)
}

generateButtons();

