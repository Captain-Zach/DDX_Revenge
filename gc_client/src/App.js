import logo from './logo.svg';
import './App.css';
import { Router } from "@reach/router";
import CaseList from './CaseList/CaseList';
import CaseHub from './CaseHub/CaseHub';

function App() {

  return (
    <div className="App">
      <h1>GIGACASE</h1>
      <header className="App-header">
        <Router>
          <CaseList path="/" />
          <CaseHub path ="/hub/:caseNumber" />

        </Router>

      </header>
    </div>
  );
}

export default App;
