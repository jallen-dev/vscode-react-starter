import { vscode } from "./utils/vscode"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import "./App.css"

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there partner! 🤠",
    })
  }

  return (
    <main>
      <h1 className="text-lg bg-vscode-panel-border">
        Hello World from React!
      </h1>
      <VSCodeButton onClick={handleHowdyClick}>Howdy!</VSCodeButton>
    </main>
  )
}

export default App
