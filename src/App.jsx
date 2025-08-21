import './App.css';
import Card from './components/Card';
import History from "./components/History";
import { useState } from 'react';

function App() {

  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);

  return (
    <div className="App">
      {historyOpen ? <History setHistoryOpen={setHistoryOpen} items={history}/> : null}
      <Card historyOpen={historyOpen} setHistoryOpen={setHistoryOpen} history={history} setHistory={setHistory} />
    </div>
  );
}

export default App;
