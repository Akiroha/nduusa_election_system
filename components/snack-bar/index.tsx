import { useSnack } from '@/hooks';
import SnackbarItem from './snack-bar-item';

const Snackbar = () => {
  // get snacks from redux store
  const snack = useSnack();

  return (
    <div className="toast toast-start">
      {snack.selector.map((snack) => {
        return (
          <SnackbarItem
            key={snack.timestamp}
            timestamp={snack.timestamp}
            status={snack.status}
            message={snack.message}
          />
        );
      })}
    </div>
  );
};

export default Snackbar;
