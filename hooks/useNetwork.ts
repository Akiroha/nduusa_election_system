import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../store';
import { networkActions } from '../store/network-slice';

const useNetwork = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: StateType) => state.network);

  class Network {
    selector;

    constructor() {
      this.selector = selector;
    }

    updateNetworkStatus(value: boolean) {
      dispatch(networkActions.updateNetworkStatus({ isOnline: value }));
    }
  }

  return new Network();
};

export default useNetwork;
