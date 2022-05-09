import React from 'react';
import Editor from '@monaco-editor/react';
import { useEditorValue } from '~/hooks/useEditorValue';

export const MarkdownEditor: React.FC = () => {
  const [value, setValue] = useEditorValue('');

  if (value == null) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Editor
        height="600px"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue={value}
        onChange={(value = '') => setValue(value)}
      />
    </>
  );
};
