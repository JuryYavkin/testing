import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RoundList from './pages/RoundList';
import Round from './pages/Round';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rounds" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rounds" element={<RoundList />} />
        <Route path="/rounds/:id" element={<Round />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
