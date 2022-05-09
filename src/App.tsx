import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<p>Hello World</p>} />
    <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
    </BrowserRouter>
  )
}