import React from "react";
import LoveForm from "./components/LoveForm";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <img
        className="app-img"
        src="https://www.freeiconspng.com/uploads/love-png-5.png"
        alt="love"
      />
      <h1>LOVE CALCULATOR BY OLUWASEYI</h1>
      <div className="app-form">
        <LoveForm />
      </div>
    </div>
  );
};

export default App;
