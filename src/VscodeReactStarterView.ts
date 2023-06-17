import * as vscode from "vscode"

class VscodeReactStarterView implements vscode.WebviewViewProvider {
  public static readonly viewType = "vscodeReactStarterView"
  private static instance: VscodeReactStarterView

  private _view?: vscode.WebviewView

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public static getInstance(_extensionUri: vscode.Uri): VscodeReactStarterView {
    if (!VscodeReactStarterView.instance) {
      VscodeReactStarterView.instance = new VscodeReactStarterView(
        _extensionUri
      )
    }

    return VscodeReactStarterView.instance
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    }

    this._view.webview.html = this._getHtmlForWebview(this._view.webview)
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VSCode React Starter</title>
      </head>
      <body>
        Hello World!
      </body>
    </html>`
  }
}

export default VscodeReactStarterView
