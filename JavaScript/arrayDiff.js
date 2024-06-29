/**
 * This function finds the difference between two arrays, and return a new array
 * containing elements that are present in the first array `array1` but not in
 * the second array `array2`.
 * 
 * @param {array} array1 The first array to compare.
 * @param {array} array2 The second array to compare.
 * @returns {array}
 * 
 * @example
 * const fruits1 = ["apple", "banana", "orange"];
 * const fruits2 = ["banana", "mango", "grapes"];
 * 
 * const difference = arrayDiff(fruits1, fruits2);
 * console.log(difference); // Output: ["apple", "orange"]
 * 
 * @author Nycolas Felipe
 */
const arrayDiff = (array1, array2) => {
  if (Array.isArray(array1) && Array.isArray(array2)) {
    let temp = [];
    // Loop through elements in array1
    for (let i of array1) {
      // Check if element exists in array2 using indexOf
      if (array2.indexOf(i) === -1) {
        temp.push(i);
      }
    }
    return temp;
  } else {
    console.debug("One of the provided parameters is not an array.");
    return [];
  }
};

export default arrayDiff;