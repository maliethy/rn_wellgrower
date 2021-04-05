import { useState, useCallback } from 'react';

const useInput = (initialValue: null | string): any => {
  const [value, setValue] = useState(initialValue);
  const onChangeText = useCallback((e) => {
    setValue(e);
  }, []);
  const onResetText = useCallback(() => {
    setValue('');
  }, []);
  return [value, onChangeText, onResetText, setValue];
};
export default useInput;
