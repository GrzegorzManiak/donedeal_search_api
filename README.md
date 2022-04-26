# donedeal_search_api
This project is a TypeScript package that parses data from the Donedeal API. It is useful for finding deals on Donedeal, a popular Irish classifieds ads website. This package returns parsed data from the Donedeal API that I reverse engineered from their Android app, as the Donedeal site returns baked-in results.

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
