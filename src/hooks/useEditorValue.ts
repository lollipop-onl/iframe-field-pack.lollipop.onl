import { useState, useEffect } from 'react';

export const useEditorValue = <Data>(defaultValue: Data) => {
  const [value, setValue] = useState<Data | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [iframeId, setIframeId] = useState<string>();

  useEffect(() => {
    const onMessage = (e: MessageEvent): void => {
      if (!e.isTrusted) return;

      if (!e.origin.endsWith('.microcms.io')) return;

      setOrigin(e.origin);

      switch (e.data.action) {
        case 'MICROCMS_GET_DEFAULT_DATA': {
          const { id, message } = e.data;

          setIframeId(id);

          if (!message) {
            setValue(defaultValue);
          } else {
            setValue(message.data);
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
    if (origin == null) return;

    window.parent.postMessage(
      {
        id: iframeId,
        action: 'MICROCMS_POST_DATA',
        message: {
          data: value,
        },
      },
      origin
    );
  }, [value, iframeId, origin]);

  return [value, setValue] as const;
};
