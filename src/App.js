import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Blog from './Blog';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
