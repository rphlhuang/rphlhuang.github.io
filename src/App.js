import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Blog from './blog/Blog';
import Engineering from './Engineering';
import Music from './Music';
import Education from './Education';
import Papers from './Papers';
import Apps from './Apps';
import NotFound from './NotFound';

import CV from './cv';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:folderKey" element={<Blog />} />
        <Route path="/blog/:folderKey/:postName" element={<Blog />} />
        <Route path="/computers" element={<Engineering />} />
        <Route path="/music" element={<Music />} />
        <Route path="/teaching" element={<Education />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
