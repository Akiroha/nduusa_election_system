import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '@/store';
import { userActions } from '@/store/user-slice';
import { UserType } from '@/types';

const useUser = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: StateType) => state.user);

  class User {
    selector;

    constructor() {
      this.selector = selector;
    }

    setUser(user: UserType) {
      dispatch(userActions.setUser(user));
    }
  }

  return new User();
};

export default useUser;
