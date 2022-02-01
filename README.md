# donedeal_search_api
This is a package that gives you access to the donedeal_search_api, I reverse engineered it from their android app, as their site returns results baked in the html, I have no idea why they did this, but this enpoint returns raw data that can be parsed by this module.

## Usage
``` 
clone this repo
```

## Example
```
import donedeal_search_api from 'donedeal_search_api'

(async () => {
    const data = await donedeal_search_api('Iphone 12');
    console.log(data);
})()
```

## Parameters
```
// This is the Input interface, this is how you pass in the search term etc
{
    query: string, // This is the search term
    counties?: Array<string>, // Counties to filter by, array
    price_from?: number, // the cheapest price you want to see
    price_to?: number, // the most expensive price you want to see
    page?: number, // defualt 'items per page' is 30, therefor page 1 is 0-30, page 2 is 30-60, page 3 is 60-90 etc
    items_per_page?: number, // howmany results you want to see, default is 30
}

// This is the output interface, the data will be returned in this format.
{
    ad?: string,
    id?: number,
    description?: string,
    price?: string,
    county?: string,
    url?: string,
    seller?: string,
    wanted?: boolean,
    img?: any,
}
```