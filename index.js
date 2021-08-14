// I justified using sync-fetch as its alot easier to make it asyncrounus than it is to make node-fetch sync
const fetch = require("sync-fetch");

const defaults = {
    items_per_page: 30,
    adType: 'forsale',
    mileageType: 'Kilometres',
    priceType: 'Euro',
    section: 'all',
    sort: 'relevance desc',
    viewType: 'list',
}

//--// Consturcts a json query that will be used to fetch data from donedeals api.
function QueryConstructor(input) {
    if (!input.query) throw new Error('Function call contains no query parameter');

    let Base = {
        words: input.query,
        adType: defaults.adType,
        mileageType: defaults.mileageType,
        priceType: defaults.priceType,
        section: defaults.section,
        sort: defaults.sort,
        viewType: defaults.viewType
    }

    //--// Checks if the search query contains a minimum price, if so add it to the stack.
    if (input.price_min && typeof input.price_min === 'number') Base.price_from = input.price_min;

    //--// Checks if the search query contains a maximum price, if so add it to the stack.
    if (input.price_max && typeof input.price_max === 'number') Base.price_to = input.price_max;

    if (typeof input.page === 'number') {
        if (input.page === 0) Base.start = 0;
        else Base.start = defaults.items_per_page * --input.page;

        Base.max = defaults.items_per_page * input.page;
    } else {
        Base.start = 0;
        Base.max = defaults.items_per_page;
    }

    return JSON.stringify(Base);
}

//--// Takes the raw input and formats it into a structured Object.
function PraseData(data, obj = []) {
    data['ads'].forEach(ad => {
        obj = [...obj, {
            name: ad['header'],
            description: ad['description'],
            price: ad['price'],
            seller: ad['seller']['name'],
            url: ad['friendlyUrl'],
            img: function() {
                // If the listing contains no images, return null.
                // All other values are required therefore need no checking.
                if (ad['photos']) return ad['photos'][0]['small'];
                else return null;
            }()
        }];
    });
    return obj;
}

function index(input, rawdata, async) {
    let Query = QueryConstructor(input);
    let Endpoint = 'https://www.donedeal.ie/search/api/v4/find/';

    const content = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: Query
    };

    if (async === true) {
        return new Promise((resolve) => {
            if (rawdata === true) resolve(fetch(Endpoint, content));
            else resolve(PraseData(fetch(Endpoint, content).json()));
        });
    } else {
        if (rawdata === true) return fetch(Endpoint, content);
        else return PraseData(fetch(Endpoint, content).json());
    }
}

module.exports = {
    /**
     * Uses Donedeal.ie mobile api to provide search access to their catalog of clasified ads.
     * 
     * @param {Object} input - Input object that conatins the search parameters.
     * @param {string} input.query - Search query.
     * @param {number} input.page - The ammount of results to return, defalted to 30 per page.
     * @param {number} input.min_price - Minimum price of returned results.
     * @param {number} input.max_price - Maximum price of returned results.
     * 
     * @param {Boolean} rawdata - If true, returns raw data straight from the api.
     * @param {Boolean} async - If true, Returns a promise.
     * 
     * @returns {Object} { name: String, description: String, price: Number, seller: String, url: String, img: String }
     */
    search: (input, rawdata, async) => {
        return index(input, rawdata, async);
    },

    /**
     * Defualt parameters for the search function.
     * 
     * @returns {Object} { items_per_page: Number, adType: String, mileageType: String, priceType: String, section: String, sort: String, viewType: String }
     */
    defaults: () => {
        return defaults;
    }
}