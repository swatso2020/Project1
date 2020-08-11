// Array for button
const tickers = ['AAPL', 'MSFT', 'AMZN', 'FB', 'NFLX']

// API Key
// const apiKey = 'pk_7f795028e20d4cf2b689fb66874abd4f'
const apiKey = 'Tsk_45ffeac63611476c81c288bde56d0f59'
const newsCount = 50
// const env = 'cloud'
const env = 'sandbox'
const newsQueryURL = `https://${env}.iexapis.com/stable/stock/${tickers[2]}/news/last/${newsCount}?token=${apiKey}`


// pull News from IEX Api.
$.ajax({
  url: newsQueryURL,
  method: "GET"
}).then(function (response) {
  generateNews(response);

});

function generateNews(data) {
  data = data.filter(x => x.lang === 'en')
  console.log(data);

  let tbody = $('tbody')

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
  // let time = data.

}
