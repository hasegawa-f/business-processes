import './App.css';
import { PhaseProvider } from './contexts/PhaseContext';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <div className="App">
      <PhaseProvider>
        <h1>Process App</h1>
        <MainContainer/>
      </PhaseProvider>
    </div>
  );
}

export default App;