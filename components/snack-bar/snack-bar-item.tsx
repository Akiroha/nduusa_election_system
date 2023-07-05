import { useSnack } from '@/hooks';
import { useEffect, useState } from 'react';

type Props = {
  timestamp: string;
  status: string;
  message: string;
};

const SnackbarItem = ({ timestamp, status, message }: Props) => {
  const snack = useSnack();
  const [clicked, setClicked] = useState(false);

  /**
   * sets clicked to true and dispatches redux action to remove this snack object manually
   */
  const handleRemove = () => {
    setClicked(true);
    snack.removeSnack(timestamp);
  };

  /**
   * use effect to clear out this snack after some time
   */
  useEffect(() => {
    // timer to remove snack automatically after some time
    const timer = setTimeout(() => {
      snack.removeSnack(timestamp);
    }, 5000);

    // if clicked is true then we'll clear out the timeout
    if (clicked) {
      clearTimeout(timer);
    }

    // destruct timer
    return () => clearTimeout(timer);
  }, [snack, timestamp, clicked]);

  return (
    <div className="cursor-pointer" onClick={handleRemove}>
      {status === 'success' && (
        <div className="alert alert-success">
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-error">
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
      {status === 'info' && (
        <div className="alert alert-info">
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnackbarItem;
