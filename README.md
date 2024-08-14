# Water Reminder Extension

This is a simple extension that help you to remember to drink water every n minutes.

## Install <a name="install"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Install pnpm globally: `npm install -g pnpm` (check your node version >= 18.12.0)
3. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev`
      - When you run with Windows, you should run as
        administrator. [(Issue#456)](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/issues/456)
    - Prod: `pnpm build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder at root

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox`
    - Prod: `pnpm build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder at root

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Reference <a name="reference"></a>

- [Repository Boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/tree/main) by [Jonghakseo](https://jonghakseo.github.io/)