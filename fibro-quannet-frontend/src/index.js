import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/index.css';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import Predict from "./pages/Predict";
import Docs from "./pages/Docs";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Predict />} />
          <Route path="predict" element={<Predict />} />
          <Route path="docs" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>
);

