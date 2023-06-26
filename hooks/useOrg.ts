import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '@/store';
import { orgActions } from '@/store/org-slice';
import { OrgType } from '@/types';

const useOrg = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: StateType) => state.org);

  class Org {
    selector;

    constructor() {
      this.selector = selector;
    }

    setOrg(org: OrgType) {
      dispatch(orgActions.setOrg(org));
    }
  }

  return new Org();
};

export default useOrg;
