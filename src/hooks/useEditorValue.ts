import { useState, useEffect } from 'react';

export const useEditorValue = <Data>(defaultValue: Data) => {
  const [value, setValue] = useState<Data>(defaultValue);
  const [iframeId, setIframeId] = useState<string>();

  useEffect(() => {
    const onMessage = (e: MessageEvent): void => {
      if (!e.isTrusted) return;

      console.log(e.data);

      switch (e.data.action) {
        case 'MICROCMS_GET_DEFAULT_DATA': {
          setIframeId(e.data.id);

          if (e.data.message) {
            setValue(e.data.message);
          }
        }
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    window.parent.postMessage(
      {
        id: iframeId,
        action: 'MICROCMS_POST_DATA',
        message: {
          data: value,
        },
      },
      '*'
    );
  }, [value, iframeId]);

  return [value, setValue] as const;
};
