import React from "react";
import LoveForm from "./components/LoveForm";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <img
          className="app-img"
          src="https://www.freeiconspng.com/uploads/love-png-5.png"
          alt="love"
        />
        <h1>LOVE METER BY OLUWASEYI</h1>
        <div className="app-form">
          <LoveForm />
        </div>
      </div>
      <footer>
        <div>
          <p> Made with Love by Oluwaseyi</p>
          <p> &copy; 2022</p>
        </div>
      </footer>
    </>
  );
};

export default App;
