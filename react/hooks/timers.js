import { useEffect, useLayoutEffect, useState } from 'react';

export const useTimeRender = (interval, {
  initial,
  done = true
} = {}) => {
  const [check, setCheck] = useState(initial);

  useLayoutEffect(() => {
    console.log('useTimeRender interval', interval, new Date().getTime());
    const timerId = setTimeout(() => {
      console.log('useTimeRender done', new Date().getTime());
      setCheck(done);
    }, interval);

    return () => {
      clearTimeout(timerId);
    }
  }, [])

  return check;
}
