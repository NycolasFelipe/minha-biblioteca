function titleCase(str) {
  if (!str instanceof String) {
    return console.log("Provided value is not a string.");
  }
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

module.exports = titleCase;