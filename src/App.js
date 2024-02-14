import React from "react";
import Players from "./components/Players";
import SearchBar from "./components/Search";

function App() {
  return (
    <div className="container">
      <h1 style={{textAlign:'center'}}>Sportify App</h1>
      <SearchBar/>
      <Players />
     
    </div>
  );
}

export default App;
