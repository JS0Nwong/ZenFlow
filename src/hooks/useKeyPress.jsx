import { useCallback, useEffect, useRef, useLayoutEffect } from 'react'

export default function useKeyPress(keys, callbackFn, node = null) {
  const callbackRef = useRef(callbackFn)

  useLayoutEffect(() => {
    callbackRef.current = callbackFn 
  })

  // handles what happens on hotkey press
  const handleKeyPress = useCallback((e) => {
    if(keys.some((key) => e.keyCode === key)) {
      callbackRef.current(e)
    }
  }, [keys])

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode && targetNode.addEventListener('keydown', handleKeyPress)

    return () => 
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress)
    
  }, [handleKeyPress, node])
}
