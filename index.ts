let fetch = require('node-fetch');

// these are just the counties in ireland AND the donedeals search endpoint.
export const COUNTIES:Array<string> = ['antrim', 'armagh', 'carlow', 'cavan', 'clare', 'cork', 'derry', 'donegal', 'down', 'dublin', 'fermanagh', 'galway', 'kerry', 'kildare', 'kilkenny', 'laois', 'leitrim', 'longford', 'louth', 'mayo', 'meath', 'monaghan', 'offaly', 'roscommon', 'sligo', 'tipperary', 'tyrone', 'waterford', 'westmeath', 'wexford', 'wicklow'],
    ENDPOINT:string = 'https://www.donedeal.ie/search/api/v4/find/';

// this interface is used to define the input parameters for the query.
interface InputInterface {
    query: string,
    counties?: Array<string>,
    price_from?: number,
    price_to?: number,
    page?: number,
    items_per_page?: number,
    max?: number,
    start?: number,
}

// This interface is the result of the query.
interface ResultInterface {
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

// this function returns the default parameters for the query.
const DEFUALT_PARAMS = (): { [key:string]: any } => {
    return {
        items_per_page: 30,
        adType: 'forsale',
        mileageType: 'Kilometres',
        priceType: 'Euro',
        section: 'all',
        sort: 'relevance desc',
        viewType: 'list',
    }
}

// Consturcts a json query that will be used to fetch data from donedeals api.
let queryConstructor = (input:InputInterface): string => {

    // Throw an error if the user did not provide a valid input.
    if (!input.query)
        throw new Error('Function call contains no query parameter');

    // Get the default parameters.
    let query = DEFUALT_PARAMS();

    // Lets verify that the user has provided valid county names.
    if (input?.counties !== undefined) {
        input.counties.forEach((county) => {
            // Cast the county to lowercase.
            county = county.toLowerCase();

            // If the county is not valid, throw an error.
            if (!COUNTIES.includes(county))
                throw new Error('Invalid county name');

            // Check if the county is already in the query.
            else if (query?.counties?.includes(county)) 
                return;

            // If its a valid county name, add it to the query.
            else query.counties = [...query?.counties || [], county];
        });

        // remove the old counties parameter.
        delete input.counties;
    }

    // lets merge the input with the default parameters.
    Object.assign(query, input);

    // Has the user provided a page number?
    // This is used to determine the offset of the query.
    if (input?.page !== undefined) {
        query.max = input.page * query.items_per_page;
        query.start = query.max - query.items_per_page;
    }

    // return the query.
    return JSON.stringify(query);
}

// This function is responsible for parsing the response from the donedeals api.
let parseData = (rawData:any): Array<ResultInterface> => {   
    // create an empty array to store the data.
    let data:Array<ResultInterface> = [];
    
    // Parse the raw data into a json object.
    rawData?.ads?.forEach((ad:any) => {
        let temp:any = {
            name: ad?.header,
            id: ad?.id,
            description: ad?.description,
            price: ad?.price,
            county: ad?.county,
            url: ad?.friendlyUrl,
            seller: ad?.seller,
            wanted: ad?.wanted,
            img: ad?.photos?.[0]?.url,
        }

        // Add the ad to the data array.
        data.push(temp);
    });

    // return the data.
    return data;
}

/**
 * This function is responsible for fetching the data from the donedeals api.
 * 
 * @param { InputInterface } input - The input parameters for the query.
 * @returns { Promise<Array<ResultInterface>> } - A promise that resolves to an array of ResultInterface.
*/
export default async(input:InputInterface):Promise<Array<ResultInterface>> => {
    // Construct the query.
    let query:string = queryConstructor(input);

    // construct the body of the request.
    const content = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: query
    };

    // make the request.
    let response = await fetch(ENDPOINT, content);

    // parse the response.
    return parseData(await response.json());
}
