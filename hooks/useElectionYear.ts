import { StateType } from '@/store';
import { electionYearActions } from '@/store/election-year-slice';
import { ElectionYearType } from '@/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const useElectionYear = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: StateType) => state.election_year);

  class ElectionYear {
    selector;

    constructor() {
      this.selector = selector;
    }

    setElectionYear(election_year: ElectionYearType) {
      dispatch(electionYearActions.setElectionYear(election_year));
    }
  }

  return new ElectionYear();
};

export default useElectionYear;
