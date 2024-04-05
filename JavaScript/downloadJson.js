export default function downloadJson() {
  //Build a JSON object
  let object = {
    property: "property"
  }

  //Convert JSON to string
  let json = JSON.stringify(object);

  //Convert JSON string to BLOB
  json = [json];
  let blob = new Blob(json, { type: "text/plain;charset=utf-8" });

  //Check the Browser
  let isIE = false || !!document.documentMode;
  if (isIE) {
    window.navigator.msSaveBlob(blob, `object`);
  } else {
    let url = window.URL || window.webkitURL;
    let link = url.createObjectURL(blob);
    let a = $("<a />");
    a.attr("download", `object.json`);
    a.attr("href", link);
    $("body").append(a);
    a[0].click();
    $("body").remove(a);
  }
}