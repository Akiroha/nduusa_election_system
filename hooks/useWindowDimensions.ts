import { useSyncExternalStore } from 'react';

const useWindowDimensions = () => {
  function onWindowSizeChange(onChange: () => void) {
    window.addEventListener('resize', onChange);
    return () => window.removeEventListener('resize', onChange);
  }

  function getWindowWidthSnapshot() {
    return window.innerWidth;
  }

  function getWindowHeightSnapshot() {
    return window.innerHeight;
  }

  const windowWidth = useSyncExternalStore(
    onWindowSizeChange,
    getWindowWidthSnapshot
  );

  const windowHeight = useSyncExternalStore(
    onWindowSizeChange,
    getWindowHeightSnapshot
  );

  return { windowWidth, windowHeight };
};

export default useWindowDimensions;
