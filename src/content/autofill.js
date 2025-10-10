chrome.storage.local.get(["fields"], (result) => {
  const fields = result.fields || [];
  const inputs = document.querySelectorAll("input");

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
