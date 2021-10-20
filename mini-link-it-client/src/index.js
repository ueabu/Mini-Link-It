import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbo5jKpHHQK9l6q9GnqprbXufvoUjJflM",
  authDomain: "mini-link-it.firebaseapp.com",
  projectId: "mini-link-it",
  storageBucket: "mini-link-it.appspot.com",
  messagingSenderId: "49632902433",
  appId: "1:49632902433:web:23d16c6db052a8551d9260",
  measurementId: "G-MN3XV0B1JJ"
};

initializeApp(firebaseConfig);
ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
