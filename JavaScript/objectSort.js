/**
 * This function sorts an array of objects based on a specified property.
 * The sorting result can be ascending or descending.
 * 
 * @param {array} array Array containing objects to be sorted. Each object must have the same key parameter specified.
 * @param {string} key String representing the name of the object's property used for sorting.
 * @param {boolean} asc [Optional] Boolean value indicating the sorting direction. Default is true.
 * @returns {array}
 * 
 * @example
 * const products = [
 *  { name: "Pen", price: 2.5 },
 *  { name: "Book", price: 10.0 },
 *  { name: "Eraser", price: 1.5 }
 * ];
 * 
 * // Sort by price ascending
 * const productsPriceAsc = arraySort(products, "price");
 * console.log(productsPriceAsc); 
 * 
 * // Output:
 * // [
 * //  { name: "Eraser", price: 1.5 },
 * //  { name: "Pen", price: 2.5 },
 * //  { name: "Book", price: 10.0 }
 * // ];
 * 
 * // Sort by price descending
 * const productsPriceDes = arraySort(products, "price", false);
 * console.log(productsPriceDes); 
 * 
 * // Output:
 * // [
 * //  { name: "Book", price: 10.0 },
 * //  { name: "Pen", price: 2.5 },
 * //  { name: "Eraser", price: 1.5 }
 * // ];
 * /*
 * 
 * @author Nycolas Felipe
 */
const objectSort = (array, key, asc = true) => {
  let validKey = true;
  if (Array.isArray(array)) {
    array.forEach((e) => {
      if (!e.hasOwnProperty(key)) {
        validKey = false;
      }
    });
    if (validKey) {
      let sortedArray = [];
      if (asc) {
        sortedArray = array.sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
      } else {
        sortedArray = array.sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
      }
      return sortedArray;
    } else {
      console.debug(`One element doesn't have the specified key '${key}'.`);
      return [];
    }
  } else {
    console.debug("Provided invalid array.");
    return [];
  }
}

export default objectSort;