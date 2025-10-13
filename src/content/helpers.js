function fillInput(input, value) {
  input.focus();
  input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));

  input.blur();
}

function matchInput(input, label) {
  const id = input.id?.toLowerCase() || "";
  const name = input.name?.toLowerCase() || "";
  const type = input.type?.toLowerCase() || "";
  const placeholder = input.placeholder?.toLowerCase() || "";
  const labelLower = label?.toLowerCase() || "";

  return (
    id === labelLower ||
    name === labelLower ||
    type === labelLower ||
    placeholder === labelLower
  );
}
