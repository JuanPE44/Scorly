import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      console.log("beforeinstallprompt", e);
      setDeferredPrompt(e);
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("click");
    const promptEvent = deferredPrompt;

    if (!promptEvent) {
      console.log("ningun prompt evente guardado en window");
      return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    console.log("user choice", result);

    setDeferredPrompt(null);
    setIsReadyForInstall(false);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {isReadyForInstall && <button onClick={downloadApp}>Descarga</button>}
    </>
  );
}

export default App;
