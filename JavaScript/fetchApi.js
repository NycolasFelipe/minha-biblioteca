/**
 * This asynchronous function fetches data from an API endpoint.
 * It takes an optional id parameter to potentially construct a URL with a specific identifier.
 * The function handles development and production environments by using different base URLs 
 * based on `window.location.hostname`.
 * 
 * @param {string} id [Optional]: Optional identifier to be appended to the API endpoint URL.
 * @returns {Promise}
 * 
 * @description
 * This is a model fetch function to be used as a basis for building fetch functions with 
 * real applications.
 * 
 * @author Nycolas Felipe
 */
export default async function fetchApi(id = null) {
  const dev = window.location.hostname.includes("localhost");
  const url = id ?
    (dev ? "http://localhost:3000/endpoint/" : "https://website/endpoint/") + id :
    (dev ? "http://localhost:3000/endpoint" : "https://website/endpoint");
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.debug('Fetching error:', error);
  }
}
