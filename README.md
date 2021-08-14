# donedeal_search_api
A reverse engineered donedeal.ie search api, packaged for easy use.

# Usage
``` 
npm install donedeal_search_api 
```

```javascript
const donedeal = require('donedeal_search_api');

// sets the defualt return ammount to 50 per page
// and sets the ad type to 'wanted' from the defualt 'forsale'
donedeal.defaults = {
  items_per_page: 50,
  adType: 'wanted'
}

donedeal.search({ query: 'test', page: 3, min_price:10, max_price: 100});
// => [ { name: String, description: String, price: Number, seller: String, url: String, img: String }, ... ]

// Seccond Parameter defines if it should return raw api response data
donedeal.search({ query: 'test', page: 3, max_price: 100}, true);
// => object

 // Third Parameter defines if it shoul execute asynchronously
donedeal.search({ query: 'test', page: 3, max_price: 100}, false, true);
// => promise

```
