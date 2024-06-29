/**
 * This function converts a string to the title case format.
 * 
 * @param {string} str String to be capitalized.
 * @returns {string}
 * 
 * @example
 * const titleCasedText = titleCase("this is a sentence");
 * console.log(titleCasedText); // Output: "This Is A Sentence"
 * 
 * @author Nycolas Felipe
 */
const titleCase = (str) => {
  if (!str instanceof String) {
    return console.log("Provided value is not a string.");
  }
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

export default titleCase;