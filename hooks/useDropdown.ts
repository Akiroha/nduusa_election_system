import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import useWindowDimensions from './useWindowDimensions';

const dropdownOpen = 'dropdown-open';

const useDropdown = (
  mainRef: RefObject<HTMLDivElement>,
  dropdownRef: RefObject<HTMLDivElement | HTMLUListElement>
) => {
  const [mainClass, setMainClass] = useState('dropdown');
  const { windowWidth, windowHeight } = useWindowDimensions();

  useEffect(() => {
    let dropPositions: string[] = [];

    const mainBound = mainRef?.current?.getBoundingClientRect();
    if (mainBound) {
      const { x, y } = mainBound;
      if (windowWidth - x < 600) dropPositions.push('dropdown-left');
      if (windowHeight - y < 200) dropPositions.push('dropdown-top');
    }

    let val = `dropdown ${dropPositions.join(' ')}`;

    setMainClass(val.trim());
  }, [mainRef, windowWidth, windowHeight]);

  const open = () => {
    setMainClass((old) => {
      let val = old.includes(dropdownOpen) ? old : old + ` ${dropdownOpen}`;
      return val.trim();
    });
  };

  const close = () => {
    setMainClass((old) => {
      let val = old.replace(dropdownOpen, '');
      return val;
    });

    try {
      (document.activeElement as HTMLElement).blur();
    } catch (error) {}
  };

  const blur = (e: ChangeEvent) => {
    if (!dropdownRef?.current?.contains(e.target)) {
      close();
    }
  };

  return {
    mainClass,
    open,
    close,
    blur,
  };
};

export default useDropdown;
