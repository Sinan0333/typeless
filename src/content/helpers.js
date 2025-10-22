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

function getFieldMeaning(text) {
  if (!text) return null;
  const normalized = text.toLowerCase();

  const mappings = {
    email: ["email", "mail", "e-mail"],
    name: ["name", "fullname", "full_name", "user name", "username"],
    phone: ["phone", "mobile", "cell", "contact number"],
    address: ["address", "street", "location"],
    city: ["city", "town"],
    zip: ["zip", "postal", "postcode"],
    password: ["password", "passcode", "pwd"],
  };

  for (const [key, words] of Object.entries(mappings)) {
    if (words.some((w) => normalized.includes(w))) return key;
  }

  return "unknown";
}
