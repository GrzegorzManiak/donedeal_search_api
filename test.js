const donedeal = require('./index');
const util = require('util').inspect.defaultOptions.depth = null
let response;


response = donedeal.search({ query: 'test', page: 3, max_price: 100 });
console.log(typeof response);
// => [ { name: String, description: String, price: Number, seller: String, url: String, img: String }, ... ]

// Seccond Parameter defines if it should return raw api response data
response = donedeal.search({ query: 'test', page: 3, max_price: 100 }, true);
console.log(typeof response);
// => object

// Third Parameter defines if it shoul execute asynchronously
response = donedeal.search({ query: 'test', page: 3, max_price: 100, counties: ['Dublin', 'Meath', 'ff'] }, true, false);
console.log(typeof response.json);
// => promise

donedeal.defaults.items_per_page = 50;
console.log(donedeal.defaults.items_per_page);
console.log(donedeal.counties());