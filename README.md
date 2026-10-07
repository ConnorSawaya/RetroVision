# RetroVision

A lightweight Chrome extension that gives modern websites a retro desktop-style makeover with scanlines, pixelated media, classic controls, and a one-click on/off toggle.

![RetroVision preview](https://github.com/user-attachments/assets/c652eded-9b7e-40a6-aa4b-c7a0f1daf154)

## Features

- Toggle the retro theme from the extension popup.
- Applies the theme across normal webpages with a content script.
- Remembers the enabled/disabled state with `chrome.storage.local`.
- Uses a small Manifest V3 codebase built with HTML, CSS, and JavaScript.
- No account or backend is required.

## Install

RetroVision is not currently published in the Chrome Web Store, so the recommended installation method is **Load unpacked**.

1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository folder containing `manifest.json`.
6. Pin RetroVision from the extensions menu.
7. Open a webpage and use the extension popup to switch **MODE: ON**.

Some pages may need to be refreshed after the extension is first installed so the content script can load.

## How it works

`content.js` adds or removes the `retro-active` class on the page. `style.css` contains the visual theme, while `popup.js` controls the toggle and saves its state locally.

```text
popup.html / popup.js
        │
        ├─ saves toggle state with chrome.storage.local
        │
        └─ sends toggle message to the active tab
                         │
                         ▼
                    content.js
                         │
                         ▼
                  retro-active class
                         │
                         ▼
                     style.css
```

## Project structure

```text
manifest.json   Chrome Manifest V3 configuration
popup.html      Extension popup
popup.js        Toggle and saved-state logic
content.js      Applies/removes the retro mode
style.css       Retro visual theme
icons/          Extension icons
```

## Permissions

The extension uses Chrome storage for the toggle state and page access so the visual theme can be applied to websites. The project has no account system or hosted backend.

## Legacy CRX

A packaged `.crx` is included in the repository, but modern Chrome versions may block manually installed CRX files. **Load unpacked** is the recommended method for local installation.
