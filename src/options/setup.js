class TypeLessSetup {
  constructor() {
    this.fields = [];
    this.editingIndex = -1;
    this.init();
  }

  init() {
    this.addEventListeners();
    this.loadSavedFields();
    this.renderFields();
  }

  addEventListeners() {
    document.getElementById("backBtn").addEventListener("click", () => {
      window.close();
    });

    document.getElementById("addFieldBtn").addEventListener("click", () => {
      this.openFieldModal();
    });

    document.getElementById("closeModal").addEventListener("click", () => {
      this.closeFieldModal();
    });

    document.getElementById("cancelButton").addEventListener("click", () => {
      this.closeFieldModal();
    });

    document.getElementById("fieldModal").addEventListener("click", (e) => {
      if (e.target.id === "fieldModal") {
        this.closeFieldModal();
      }
    });

    document
      .getElementById("fieldConfigForm")
      .addEventListener("submit", (e) => {
        this.handleFieldSubmit(e);
      });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeFieldModal();
      }
    });
  }

  openFieldModal(editIndex = -1) {
    this.editingIndex = editIndex;
    const modal = document.getElementById("fieldModal");
    const modalTitle = document.getElementById("modalTitle");
    const confirmButton = document.getElementById("confirmButtonText");

    if (editIndex >= 0) {
      modalTitle.textContent = "Edit Field";
      confirmButton.textContent = "Update Field";
      this.populateFieldForm(this.fields[editIndex]);
    } else {
      modalTitle.textContent = "Add New Field";
      confirmButton.textContent = "Add Field";
      this.resetFieldForm();
    }

    modal.classList.add("active");
    document.getElementById("fieldLabel").focus();
  }

  closeFieldModal() {
    const modal = document.getElementById("fieldModal");
    modal.classList.remove("active");
    this.resetFieldForm();
    this.editingIndex = -1;
  }

  populateFieldForm(field) {
    document.getElementById("fieldLabel").value = field.label;
    document.getElementById("fieldType").value = field.type;
    document.getElementById("fieldValue").value = field.value || "";
  }

  resetFieldForm() {
    document.getElementById("fieldConfigForm").reset();
  }

  handleFieldSubmit(e) {
    e.preventDefault();

    const fieldData = {
      id:
        this.editingIndex >= 0 ? this.fields[this.editingIndex].id : Date.now(),
      label: document.getElementById("fieldLabel").value.trim(),
      type: document.getElementById("fieldType").value,
      value: document.getElementById("fieldValue").value.trim(),
    };

    if (!fieldData.label || !fieldData.type) {
      this.showError("Please fill in the required fields");
      return;
    }

    if (this.editingIndex >= 0) {
      this.fields[this.editingIndex] = fieldData;
    } else {
      this.fields.push(fieldData);
    }

    this.renderFields();
    this.closeFieldModal();
    this.saveFieldsToStorage();
    this.showFieldSuccess(this.editingIndex >= 0 ? "updated" : "added");
  }

  renderFields() {
    const container = document.getElementById("dynamicFields");

    if (this.fields.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No fields added yet</h3>
          <p>Click "Add New Field" to create your first custom form field</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.fields
      .map(
        (field, index) => `
      <div class="field-item">
        <div class="field-header">
          <div class="field-info">
          <div class="field-meta">
            <h4>${this.escapeHtml(field.label)}</h4>
              <span>Type: ${field.type}</span>
            </div>
          </div>
          <div class="field-actions">
            <button class="edit-button" data-index="${index}" title="Edit field">
              ✏️
            </button>
            <button class="delete-button" data-index="${index}" title="Delete field">
              🗑️
            </button>
          </div>
        </div>
        <div class="field-preview">
          ${this.renderFieldInput(field)}
        </div>
      </div>
    `
      )
      .join("");

    container.querySelectorAll(".edit-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        this.openFieldModal(index);
      });
    });

    container.querySelectorAll(".delete-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        this.deleteField(index);
      });
    });
  }

  renderFieldInput(field) {
    const commonAttrs = `
      value="${this.escapeHtml(field.value || "")}"
      disabled
    `;

    if (field.type === "textarea") {
      return `<textarea ${commonAttrs}>${this.escapeHtml(
        field.value || ""
      )}</textarea>`;
    }

    return `<input type="${field.type}" ${commonAttrs}>`;
  }

  deleteField(index) {
    if (confirm("Are you sure you want to delete this field?")) {
      const fieldLabel = this.fields[index].label;
      this.fields.splice(index, 1);
      this.renderFields();
      this.saveFieldsToStorage();
      this.showFieldSuccess("deleted", fieldLabel);
    }
  }

  saveFieldsToStorage() {
    try {
      // localStorage.setItem("typelessFields", JSON.stringify(this.fields));
      chrome.storage.local.set({ fields: this.fields });
    } catch (error) {
      console.error("Error saving fields:", error);
      this.showError("Failed to save configuration");
    }
  }

  loadSavedFields() {
    try {
      // const savedFields = localStorage.getItem("typelessFields");
      chrome.storage.local.get(["fields"], (result) => {
        if (result.fields) {
          this.fields = result.fields;
          this.renderFields();
        } else {
          this.fields = [];
        }
      });
    } catch (error) {
      console.error("Error loading saved fields:", error);
      this.fields = [];
    }
  }

  showConfigSuccess() {
    this.showMessage(
      `✅ Configuration saved successfully! ${this.fields.length} field(s) ready to use.`,
      "success"
    );
  }

  showFieldSuccess(action, fieldLabel = "") {
    const messages = {
      added: "✅ Field added successfully!",
      updated: "✅ Field updated successfully!",
      deleted: `✅ Field "${fieldLabel}" deleted successfully!`,
    };

    this.showMessage(messages[action], "success");
  }

  showError(message) {
    this.showMessage(`❌ ${message}`, "error");
  }

  showMessage(message, type = "success") {
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement("div");
    messageElement.className = `form-message form-${type}`;
    messageElement.textContent = message;

    if (type === "error") {
      messageElement.style.background = "var(--error)";
    }

    const container = document.querySelector(".container");
    container.insertBefore(messageElement, container.firstChild);

    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.typeLessSetup = new TypeLessSetup();
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  container.style.opacity = "0";
  container.style.transform = "translateY(20px)";

  setTimeout(() => {
    container.style.transition = "all 0.6s ease";
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 100);
});
