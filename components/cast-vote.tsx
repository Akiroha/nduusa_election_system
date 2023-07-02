// 1. you are not able to vote. please resolve your balance with accoounting
// 2. voting will be open on mm/dd/yyy at hh:mm:ss
// 3. begin voting, polls close on mm/dd/yyy at hh:mm:ss
// 4. edit voting, polls close on mm/dd/yyy at hh:mm:ss

import { useOrg, useUser } from '@/hooks';

const CastVote = () => {
  const { selector: user } = useUser();
  const { selector: org } = useOrg();

  const cannotVote = false;
  const canVotePollsNotOpened = false;
  const canVoteHasNotVoted = false;
  const canVoteHasAlreadyVoted = false;
  const canVoteVotingEnded = false;

  return (
    <div className="flex flex-col text-black h-full gap-2 bg-red-500">hey</div>
  );
};

export default CastVote;
