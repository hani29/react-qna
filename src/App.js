import React from 'react';
import './App.css';
import Questions from './components/questions';
function App() {
  return (
    <div className="App">
    <div>
      <Questions />  {/* Here question component is called  */}
    </div>
  </div>
  );
}
export default App;
