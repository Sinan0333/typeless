chrome.storage.local.get(["fields"], (result) => {
  const fields = result.fields || [];
  const inputs = document.querySelectorAll("input");

  console.log(fields);

  fields.forEach((field) => {
    inputs.forEach((input) => {
      if (
        input.id === field.label ||
        input.name === field.label ||
        input.type === field.label ||
        input.type === field.label ||
        input.placeholder === field.label
      ) {
        input.value = field.value;
      }
    });
  });
});

// id
// name
// type
// placeholder

// const labelMatch = (input, field) => {
//   return (

//   );
// };
