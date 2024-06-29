/**
 * This asynchronous function sends a POST request to an API endpoint, including a provided
 * JavaScript object data in the request body. It handles development and production 
 * environments by using different base URLs based on `window.location.hostname`.
 * 
 * @param {object} object JavaScript object containing data to be sent in the POST request body.
 * @returns {Promise}
 * 
 * @description
 * This is a model fetch function to be used as a basis for building fetch functions with 
 * real applications.
 * 
 * @author Nycolas Felipe
 */
export default async function fetchApiPost(object) {
  const dev = window.location.hostname.includes("localhost");
  const url = dev ?
    "http://localhost:3000/endpoint" :
    "https://website/endpoint";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: object })
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Fetching error:', error);
  }
}