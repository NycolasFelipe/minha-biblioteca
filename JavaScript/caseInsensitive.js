function caseInsensitive(input, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return input.match(regex)?.length > 0;
}

module.exports = caseInsensitive;