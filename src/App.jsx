import { useEffect, useState } from "react";
import Editor from "./componenets/Editor";
import useLocalStorge from './hooks/useLocalStorage.js';

function App() {
  const [html, setHtml] = useLocalStorge('html', '');
  const [css, setCss] = useLocalStorge('css', '');
  const [js, setJs] = useLocalStorge('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)
    
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor 
          language='xml' 
          displayName='HTML' 
          value={html}
          onChange={setHtml}
        />
        <Editor 
          language='css' 
          displayName='CSS' 
          value={css}
          onChange={setCss}
        />
        <Editor 
          language='javascript' 
          displayName='JavaScript' 
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe 
          srcDoc={srcDoc}
          title="output" 
          sandbox="allow-scripts" 
          width="100%"
          height="100%"
          style={{border: 0}}
        />
      </div>
    </>
  )
}

export default App
