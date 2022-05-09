import React, { useState, useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { useEditorValue } from '~/hooks/useEditorValue';

export const MarkdownEditor: React.FC = () => {
  const [value] = useEditorValue();
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

  return <div ref={monacoEl} style={{ width: '100%', height: '600px' }} />;
};
