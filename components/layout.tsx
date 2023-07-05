import { useNetwork, useSnack } from '@/hooks';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { updateNetworkStatus } = useNetwork();
  const { addSnack } = useSnack();

  useEffect(() => {
    const onlineListen = () => {
      // dispatch redux action to add snack
      addSnack('success', 'Reconnected to the internet');

      // dispatch redux action to update network status to is online
      updateNetworkStatus(true);
    };

    const offlineListen = () => {
      // dispatch redux action to add snack
      addSnack('error', 'Disconnected from the internet');

      // dispatch redux action to update network status to false
      updateNetworkStatus(false);
    };

    // listen for online status changing
    window.addEventListener('online', onlineListen);
    // now we listen for network status changes
    window.addEventListener('offline', offlineListen);

    // destruct event listeners
    return () => {
      window.removeEventListener('online', onlineListen);
      window.removeEventListener('offline', offlineListen);
    };
  }, []);

  return <div className="h-full">{children}</div>;
};

export default Layout;
