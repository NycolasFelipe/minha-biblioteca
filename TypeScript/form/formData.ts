export default function formData(form: HTMLFormElement) {
  const inputs = form.querySelectorAll("input");
  let values: {[prop: string]: string} = {};
  inputs.forEach(input => {
    values[input.id] = input.value;
  });
  return values;
}

// Using example
const form = document.querySelector("form")!;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = formData(form);
  console.log(data);
  /*
    output:
    {
      name: "name",
      email: "name@mail.com",
      ...
    }
  */
});
