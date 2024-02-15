import React from "react";
import Players from "./components/Players";
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h1 style={{textAlign:'center'}}>Sportify App</h1>
     
      <Routes>
      <Route exact path='/' element={<Players />} /> 
      </Routes>
      
    </div>
  );
}

export default App;
