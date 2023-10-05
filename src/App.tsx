import React from 'react';
import './App.css';
import QuoteComponent from './components/QuoteComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <QuoteComponent />
      <div className="wipe-effect"></div>
    </div>
  );
}

export default App;
