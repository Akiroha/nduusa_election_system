// 1. you are not able to vote. please resolve your balance with accoounting
// 2. voting will be open on mm/dd/yyy at hh:mm:ss
// 3. begin voting, polls close on mm/dd/yyy at hh:mm:ss
// 4. edit voting, polls close on mm/dd/yyy at hh:mm:ss

import moment from 'moment';
import { useOrg, useUser } from '@/hooks';
import Inactive from './inactive';
import Voted from './voted';
import Countdown from './countdown';
import Vote from './vote';
import Results from './results';

const CastVote = () => {
  const { selector: user } = useUser();
  const { selector: org } = useOrg();
  const { active, voted } = user.value;
  const { voting_starts, voting_ends } = org.value;
  const pollsOpened = moment(voting_starts).isBefore(moment());
  const pollsClosed = moment(voting_ends).isBefore(moment());

  if (pollsClosed) return <Results />;

  if (!active) return <Inactive />;

  if (voted) return <Voted voting_ends={voting_ends!} />;

  if (!pollsOpened) return <Countdown voting_starts={voting_starts!} />;

  return <Vote />;
};

export default CastVote;
