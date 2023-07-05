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
  const [voteCount, setVoteCount] = useState(0);
  const [localOptions, setLocalOptions] = useState<LocalOptions[]>([]);

  useEffect(() => {
    const fetchVotesByPosition = async () => {
      const { data, error } = await supabase.user_vote.getVotesByPosition(
        positionId
      );

      if (!error && data) {
        let opToVotesMap = new Map<string, number>();
        let totalVoteCount = data.length;
        let localOps = [];

        setVoteCount(totalVoteCount);

        data.forEach((vote) => {
          let op = vote.voting_position_option;

          if (opToVotesMap.has(op)) {
            let currCount = opToVotesMap.get(op) ?? 0;
            opToVotesMap.set(op, (currCount += 1));
          } else {
            opToVotesMap.set(op, 1);
          }
        });

        localOps = options
          .map((op) => ({
            id: op.id,
            name: op.name,
            count: opToVotesMap.get(op.id) ?? 0,
            percent: opToVotesMap?.get(op.id)
              ? Math.round((opToVotesMap.get(op.id) / totalVoteCount) * 100)
              : 0,
          }))
          .sort((a, b) => {
            if (a.percent > b.percent) return -1;
            return 1;
          });

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
      <p className="text-2xl font-bold mb-2">{title}</p>
      <div className="flex flex-col gap-2">
        {localOptions.map((option, index) => (
          <div
            key={option.id}
            className={`flex gap-2 justify-between text-lg ${
              index === 0 && 'text-primary font-bold'
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
