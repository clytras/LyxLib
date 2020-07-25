import { useEffect, useRef } from 'react';

// https://kentcdodds.com/blog/compound-components-with-react-hooks
export function useEffectAfterMount(cb, dependencies) {
  const justMounted = useRef(true)
  useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}
