# What is this?

This is a starter project for a Visual Studio Code extension, featuring a web view container in the Activity Bar. The web view runs a React app. Vite.js is used to build the React app and to run a dev server with Hot Module Replacement, which the extension connects to when run in development mode.

Check the first few commits to see how to logically go from hello world → activity bar webview → react → HMR

## Credits

Code largely copy-pasted from this [Webview UI Toolkit Sample](https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/frameworks/hello-world-react-vite)

The technique (and code) for connecting to a dev server in development mode was copied from [VSCode Front Matter](https://github.com/estruyf/vscode-front-matter/blob/3a0fe7b4db18ef10285f908a3a4d4efe9503afeb/src/explorerView/ExplorerView.ts)

The only thing I had to do was fix some issues to get Vite's HMR to work inside of VS Code. That involved:

1. Setting the HMR host to `localhost` instead of a random generated url (default) so I could include it in the CSP.

2. Manually inject @react-refresh (thanks to [https://github.com/vitejs/vite/issues/1984#issuecomment-778289660](https://github.com/vitejs/vite/issues/1984#issuecomment-778289660)).

# How to run

1. Start the dev server for the UI (React): `npm run start:webview`

2. Hit `F5`
