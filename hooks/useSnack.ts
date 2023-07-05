import { useDispatch, useSelector } from 'react-redux';
import { snackActions } from '../store/snack-slice';
import { StateType } from '../store';

const useSnack = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: StateType) => state.snack);

  class Snack {
    selector;

    constructor() {
      this.selector = selector;
    }

    addSnack(status: 'success' | 'error', message: string) {
      dispatch(
        snackActions.addSnack({
          timestamp: Date.now().toString(),
          status: status,
          message: message,
        })
      );
    }

    removeSnack(timestamp: string) {
      dispatch(snackActions.removeSnack(timestamp));
    }
  }

  return new Snack();
};

export default useSnack;
