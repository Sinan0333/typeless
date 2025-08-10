# TypeLess – Auto Form Filler Chrome Extension

**TypeLess** is a Chrome extension that saves your details once and fills online forms instantly — no more repetitive typing.  
Whether it’s a simple sign-up form or a long registration form, TypeLess handles it with one click.

---

## 🚀 Features

- **Save Your Details Once** – Store personal information securely in your browser.
- **One-Click Form Filling** – Fill forms instantly with a button click.
- **Customizable Profiles** – Create multiple profiles (Personal, Work, etc.).
- **Hotkey Support** – Quickly fill forms using keyboard shortcuts.
- **Secure Storage** – Data is stored locally with optional encryption.
- **Field Mapping** – Smart detection of input fields across websites.
- **Partial Fill Option** – Fills only the fields you have saved.

---

## 📂 Project Structure

TypeLess/
│
├── manifest.json                # Extension config (Manifest V3)
├── README.md                    # Documentation
├── package.json                 # If you use npm & bundlers
│
├── assets/                      # Static files (icons, images, etc.)
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── logo.png
│
├── src/                         # All source code
│   ├── background/              # Service workers / background scripts
│   │   └── background.js
│   │
│   ├── content/                  # Scripts injected into web pages
│   │   ├── autofill.js
│   │   ├── formDetection.js
│   │   └── helpers.js
│   │
│   ├── popup/                    # Popup UI when clicking extension icon
│   │   ├── popup.html
│   │   ├── popup.js
│   │   └── popup.css
│   │
│   ├── options/                  # Full settings page
│   │   ├── options.html
│   │   ├── options.js
│   │   └── options.css
│   │
│   ├── utils/                    # Shared helper functions
│   │   ├── storage.js
│   │   ├── encryption.js
│   │   └── formMapping.js
│   │
│   └── styles/                   # Global CSS (if any)
│       └── common.css
│
├── dist/                         # Compiled / bundled files for production
│
└── test/                         # Unit & integration tests
    ├── content.test.js
    ├── utils.test.js
    └── popup.test.js


## 🛠 Installation (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/typeless.git