chrome.storage.local.get(["fields"], (result) => {
  const fields = result.fields || [];
  const inputs = document.querySelectorAll("input");

  fields.forEach((field) => {
    inputs.forEach((input) => {
      const label = field.label.toLowerCase();
      const id = input.id.toLowerCase();
      const name = input.name.toLowerCase();
      const type = input.type.toLowerCase();
      const placeholder = input.placeholder.toLowerCase();

      if (
        id === label ||
        name === label ||
        type === label ||
        placeholder === label
      ) {
        input.value = field.value;
      }
    });
  });
});
