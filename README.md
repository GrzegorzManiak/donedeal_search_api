# donedeal_search_api
A reverse engineered donedeal.ie search api, packaged for easy use.

# Usage
``` 
npm install donedeal_search_api 
```

# Parameters

** param Object input - Input object that conatins the search parameters.
** param string input.query - Search query.
** param string input.counties - Define an array of counties, which will result in results only from those counties.
** param number input.page - The ammount of results to return, defalted to 30 per page.
** param number input.min_price - Minimum price of returned results.
** param number input.max_price - Maximum price of returned results.

** param Boolean rawdata - If true, returns raw data straight from the api.
** param Boolean async - If true, Returns a promise.

```javascript
const donedeal = require('donedeal_search_api');

// sets the defualt return ammount to 50 per page
// and sets the ad type to 'wanted' from the defualt 'forsale'
donedeal.defaults = {
  items_per_page: 50,
  adType: 'wanted'
}

donedeal.search({ query: 'test', page: 1, counties: [ 'dublin', 'meath', 'wicklow' ] min_price:10, max_price: 100});
// => [ { name: String, description: String, wanted: Boolean, county: String, price: Number, seller: String, url: String, img: String, seller_verification: { email: Boolean, phone: Boolean, allowedAccess: Boolean, bank: Boolean } }, ... ]
// => Only returns results from the specified counties.

// Seccond Parameter defines if it should return raw api response data
donedeal.search({ query: 'test', page: 3, max_price: 100}, true);
// => object

 // Third Parameter defines if it shoul execute asynchronously
donedeal.search({ query: 'test', page: 3, max_price: 100}, false, true);
// => promise

console.log(donedeal.counties());
// => Array of counties in Ireland;

```
