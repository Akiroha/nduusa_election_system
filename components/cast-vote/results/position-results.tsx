import { useSupabase } from '@/hooks';
import { useEffect, useState } from 'react';

interface Props {
  positionId: string;
  title: string;
  options: { id: string; name: string }[];
}

interface LocalOptions {
  id: string;
  name: string;
  count: number;
  percent: number;
}

const PositionResults = ({ positionId, title, options }: Props) => {
  const supabase = useSupabase();
  const [fetching, setFetching] = useState(true);
  const [localOptions, setLocalOptions] = useState<LocalOptions[]>([]);
  const [mostVotes, setMostVotes] = useState(0);
  const [tie, setTie] = useState(false);

  useEffect(() => {
    const fetchVotesByPosition = async () => {
      const { data, error } = await supabase.user_vote.getVotesByPosition(
        positionId
      );

      if (!error && data) {
        let opToVotesMap = new Map<string, number>();
        let totalVoteCount = data.length;
        let highestVoteCount = 0;
        let localOps: {
          id: string;
          name: string;
          count: number;
          percent: number;
        }[] = [];

        data.forEach((vote) => {
          let op = vote.voting_position_option;

          if (opToVotesMap.has(op)) {
            let currCount = opToVotesMap.get(op) ?? 0;
            opToVotesMap.set(op, (currCount += 1));
          } else {
            opToVotesMap.set(op, 1);
          }
        });

        options.forEach((op) => {
          let votesCount = opToVotesMap.get(op.id) ?? 0;

          localOps.push({
            id: op.id,
            name: op.name,
            count: votesCount,
            percent: Math.round((votesCount / totalVoteCount) * 100),
          });
        });

        localOps.forEach((op) => {
          if (op.count > highestVoteCount) {
            highestVoteCount = op.count;
          }
        });

        setTie(
          [...localOps].filter((op) => op.count === highestVoteCount).length > 1
        );
        setMostVotes(highestVoteCount);
        setLocalOptions(localOps);
      }
      setFetching(false);
    };

    fetchVotesByPosition();
  }, []);

  if (fetching) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold mb-2">{title}</p>
        {tie && <p className="font-bold text-primary">Tie!</p>}
      </div>
      <div className="flex flex-col gap-2">
        {localOptions.map((option) => (
          <div
            key={option.id}
            className={`flex gap-2 justify-between text-lg ${
              option.count === mostVotes && 'text-primary font-bold'
            }`}
          >
            <p>{option.name}</p>
            <div className="flex gap-2 items-center">
              <span className="text-md">({option.count} votes)</span>
              <div>{option.percent}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionResults;
