import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarkdownEditor } from '~/containers/MarkdownEditor';
import { p } from '~/utils/p';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={p('/')} element={<p>Hello World</p>} />
        <Route path={p('/markdown')} element={<MarkdownEditor />} />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};
