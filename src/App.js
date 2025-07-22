import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Blog from './blog/Blog';
import Engineering from './Engineering';
import Music from './Music';
import Education from './Education';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/computers" element={<Engineering />} />
        <Route path="/music" element={<Music />} />
        <Route path="/teaching" element={<Education />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
