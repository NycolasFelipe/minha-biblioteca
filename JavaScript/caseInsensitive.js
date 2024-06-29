/**
 * This function checks if a search term exists within a given input string,
 * regardless of case sensitivity.
 * 
 * @param {string} input The input string to be searched.
 * @param {string} searchTerm The term to search for within the `input` string.
 * @returns {boolean}
 * 
 * @example
 * const text = "This is some text to search in";
 * const searchTerm1 = "text"; // Match found (case-insensitive)
 * const searchTerm2 = "TeXt"; // Match found (case-insensitive)
 * const searchTerm3 = "notfound"; // No match
 * 
 * const result1 = caseInsensitive(text, searchTerm1);
 * const result2 = caseInsensitive(text, searchTerm2);
 * const result3 = caseInsensitive(text, searchTerm3);
 * 
 * console.log(result1); // Output: true
 * console.log(result2); // Output: true
 * console.log(result3); // Output: false
 * 
 * @author Nycolas Felipe
 */
const caseInsensitive = (input, searchTerm) => {
  const regex = new RegExp(searchTerm, "i");
  return input.match(regex)?.length > 0;
}

export default caseInsensitive;