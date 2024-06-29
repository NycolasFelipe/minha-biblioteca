/**
 * This function triggers a download of a provided JSON object as a file named after
 * the `filename` parameter in the user's browser.
 * 
 * @param {object} object JSON object to be downloaded.
 * @param {string} filename The desired filename for the downloaded file (without the ".json").
 * 
 * @example
 * const myObject = { data: "This is some data to download" };
 * const desiredFilename = "myData";
 * 
 * downloadJson(myObject, desiredFilename);  // Downloads "myData.json"
 * 
 * @author Nycolas Felipe
 */
const downloadJson = (object, filename) => {
  // Convert JSON object to string
  let json = JSON.stringify(object);

  // Convert JSON string to BLOB
  json = [json];
  let blob = new Blob(json, { type: "text/plain;charset=utf-8" });

  // Download JSON
  const url = window.URL || window.webkitURL;
  const link = url.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = link;
  anchor.download = filename + '.json';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  url.revokeObjectURL(link); // Revoke temporary URL after download
}

export default downloadJson;