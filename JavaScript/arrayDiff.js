export default function arrayDiff(array1, array2) {
  let temp = [];
  array1 = array1.toString().split(',').map(String);
  array2 = array2.toString().split(',').map(String);
  for (let i of array1) {
    if (array2.indexOf(i) === -1)
      temp.push(i);
  }
  for (let i of array2) {
    if (array1.indexOf(i) === -1)
      temp.push(i);
  }
  return temp;
};

