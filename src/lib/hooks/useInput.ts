import React, { useCallback, useState } from 'react';

export default function useInput(initialValue: string) {
  const [state, setState] = useState(initialValue);

  const onChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setState(e.target.value);
    },
    [],
  );

  return [state, onChange, setState] as const;
}
