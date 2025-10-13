chrome.storage.local.get(["fields"], (result) => {
  const fields = result.fields || [];
  const inputs = document.querySelectorAll("input");

  fields.forEach((field) => {
    inputs.forEach((input) => {
      if (matchInput(input, field.label)) {
        fillInput(input, field.value);
      }
    });
  });
});
