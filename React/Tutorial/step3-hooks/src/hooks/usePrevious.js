import { useRef, useEffect } from 'react';

/**
 * 이전 값을 추적하는 커스텀 Hook
 * @param {any} value - 추적할 값
 * @returns {any} 이전 값
 */
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

export default usePrevious;
