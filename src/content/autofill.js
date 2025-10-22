chrome.storage.local.get(["fields"], (result) => {
  const fields = result.fields || [];
  const fieldLabels = fields.map((f) => f.label.toLowerCase());
  const inputs = document.querySelectorAll("input");

  const fuse = new Fuse(fieldLabels, {
    includeScore: true,
    threshold: 0.7,
  });

  inputs.forEach((input) => {
    const labelText =
      document.querySelector(`label[for="${input.id}"]`)?.innerText ||
      input.name ||
      input.id ||
      input.placeholder ||
      "";

    const meaning = getFieldMeaning(labelText);
    let matchedField = fields.find((f) => f.label.toLowerCase() === meaning);

    if (!matchedField && fieldLabels.length > 0) {
      const [best] = fuse.search(labelText.toLowerCase());
      if (best && best.score < 0.7) {
        matchedField = fields.find((f) => f.label.toLowerCase() === best.item);
      }
    }

    if (matchedField) {
      fillInput(input, matchedField.value);
    }
  });
});
