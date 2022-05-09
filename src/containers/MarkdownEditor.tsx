import React, { useState, useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';
import { useEditorValue } from '~/hooks/useEditorValue';

export const MarkdownEditor: React.FC = () => {
  const [value, setValue] = useEditorValue('');
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setEditor((editor) => {
      if (!monacoEl.current || editor) {
        return editor;
      }

      return monaco.editor.create(monacoEl.current, {
        value: '# hello world',
        language: 'markdown',
      });
    });

    return () => editor?.dispose();
  }, [monacoEl.current]);

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
