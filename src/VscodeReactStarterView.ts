import {
  CancellationToken,
  Disposable,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode"
import { getUri } from "./utils/getUri"

class VscodeReactStarterView implements WebviewViewProvider {
  public static readonly viewType = "vscodeReactStarterView"
  private static instance: VscodeReactStarterView
  private _disposables: Disposable[] = []

  private _view?: WebviewView

  constructor(private readonly _extensionUri: Uri) {}

  public static getInstance(_extensionUri: Uri): VscodeReactStarterView {
    if (!VscodeReactStarterView.instance) {
      VscodeReactStarterView.instance = new VscodeReactStarterView(
        _extensionUri
      )
    }

    return VscodeReactStarterView.instance
  }

  public resolveWebviewView(
    webviewView: WebviewView,
    _context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    this._view = webviewView

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    }

    this._view.webview.html = this._getHtmlForWebview(this._view.webview)
    this._setWebviewMessageListener(this._view.webview)
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    while (this._disposables.length) {
      const disposable = this._disposables.pop()
      if (disposable) {
        disposable.dispose()
      }
    }
  }

  private _getHtmlForWebview(webview: Webview) {
    // The CSS file from the React build output
    const stylesUri = getUri(webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.css",
    ])
    // The JS file from the React build output
    const scriptUri = getUri(webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "index.js",
    ])

    return /*html*/ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>VSCode React Starter</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${scriptUri}"></script>
      </body>
    </html>`
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command
        const text = message.text

        switch (command) {
          case "hello":
            // Code that should run in response to the hello message command
            window.showInformationMessage(text)
            return
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      this._disposables
    )
  }
}

export default VscodeReactStarterView
