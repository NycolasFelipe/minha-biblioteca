/**
 * Extracts the values of all input, textarea, select, and file elements within a form.
 *
 * @param {HTMLFormElement} form - The form element to extract data from.
 * @returns {Object} An object containing the values of the form inputs, textareas, selects,
 *                   and files. For file inputs, the value will be a `FileList` or `null` if no files are selected.
 * 
 * @example
 * // HTML
 * // <form id="myForm">
 * //   <input id="name" value="John Doe" />
 * //   <textarea id="message">Hello!</textarea>
 * //   <input id="attachment" type="file" />
 * // </form>
 *
 * const form = document.getElementById("myForm");
 * const data = formData(form);
 * console.log(data);
 * // Output: { name: "John Doe", message: "Hello!", attachment: FileList }
 */
function formData(form) {
  const inputs = form.querySelectorAll("input, textarea, select");
  let values = {};

  inputs.forEach(input => {
    if (input.type === "file") {
      // For file inputs, store the FileList object or null if no files are selected
      values[input.id] = input.files.length > 0 ? input.files : null;
    } else {
      // For other input types, store the value
      values[input.id] = input.value;
    }
  });

  return values;
}

export default formData;
