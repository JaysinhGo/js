// Define an array of URLs for making API calls
const urls = [
    "https://pokeapi.co/api/v2/type/-1", // Invalid type, will result in a 404
    "https://pokeapi.co/api/v2/type/0",  // Another invalid type, will result in a 404
    "https://pokeapi.co/api/v2/type/1",  // URL for type 1
    "https://pokeapi.co/api/v2/type/2",  // URL for type 2
];

// Define a function to introduce a delay using Promises
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to handle a failed API request
const handleFailedRequest = async (url, index) => {
    console.log(`API call ${url} failed, moving to the end of the array`);
    // Move the failed URL to the end of the array
    urls.push(urls.splice(index, 1)[0]);
    // Introduce a delay of 1 second before retrying
    await delay(1000);
};

// Main function for making API calls
const makeAPICalls = async () => {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];

        try {
            // Attempt to fetch data from the current URL
            const response = await fetch(url);
            if (response.ok) {
                console.log(`API call ${url} successful`);
                // Introduce a delay of 1 second before making the next call
                await delay(1000);
            } else {
                // If the response is not OK, handle the failed request
                await handleFailedRequest(url, i);
                i--; // Decrement i to retry the same URL in the next iteration
            }
        } catch (error) {
            console.error(`An error occurred while calling ${url}: ${error}`);
            // If an error occurs during the API call, handle the failed request
            await handleFailedRequest(url, i);
            i--; // Decrement i to retry the same URL in the next iteration
        }
    }
};

// Initiate the API calling process
makeAPICalls();

  
