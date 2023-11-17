import { ChangeEvent, useState } from 'react';

interface InputTypeReturn {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (search: string = ''): InputTypeReturn => {
  const [value, setValue] = useState(search);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
