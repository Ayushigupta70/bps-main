import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from '../src/Routes/PublicRoute';
import MainRoute from '../src/Routes/MainRoute';
import NotFound from '../src/Pages/NotFound';

function App() {
  useEffect(() => {
    // URL params se token nikalna
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);

      // URL se token param hata dena bina page reload ke
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<PublicRoute />} />
      <Route path="/*" element={<MainRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
