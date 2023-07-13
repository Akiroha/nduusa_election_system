import { useElectionYear, useSupabase } from '@/hooks';
import { useEffect, useState } from 'react';
import PositionResults from './position-results';

const Results = () => {
  const supabase = useSupabase();
  const [fetching, setFetching] = useState(true);
  const [positionsAndOptions, setPositionsAndOptions] = useState(
    new Map<
      string,
      { title: string; options: { id: string; name: string }[] }
    >()
  );
  const { selector: election_year } = useElectionYear();

  useEffect(() => {
    const fetchOptionsAndPositions = async () => {
      const { data, error } =
        await supabase.voting_position_option.getVPOsAndTheirPositions(
          election_year.value.id!
        );

      if (!error && data) {
        let postionOptionsMap = new Map();

        data.forEach((option: any) => {
          let positionId = option.voting_position.id;
          let op = { id: option.id, name: option.name };

          if (postionOptionsMap.has(positionId)) {
            postionOptionsMap.get(positionId).options.push(op);
          } else {
            let position = {
              title: option.voting_position.title,
              options: [op],
            };

            postionOptionsMap.set(positionId, position);
          }
        });

        setPositionsAndOptions(postionOptionsMap);
      }

      setFetching(false);
    };

    fetchOptionsAndPositions();
  }, []);

  if (fetching) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-black h-full gap-10 p-2 overflow-auto">
      {Array.from(positionsAndOptions.keys()).map((p) => (
        <PositionResults
          key={p}
          positionId={p}
          title={positionsAndOptions.get(p)?.title!}
          options={positionsAndOptions.get(p)?.options!}
        />
      ))}
    </div>
  );
};

export default Results;
