import { useState, useEffect } from 'react';

export const useEditorValue = <Data>() => {
  const [value, setValue] = useState<Data>();
  const [iframeId, setIframeId] = useState<string>();

  useEffect(() => {
    const onMessage = (e: MessageEvent): void => {
      if (!e.isTrusted) return;

      console.log(e.data);

      switch (e.data.action) {
        case 'MICROCMS_GET_DEFAULT_DATA': {
          setIframeId(e.data.id);
          setValue(e.data.message);
        }
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return [value, setValue];
};
