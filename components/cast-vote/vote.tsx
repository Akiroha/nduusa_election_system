import {
  useElectionYear,
  useNetwork,
  useSnack,
  useSupabase,
  useUser,
} from '@/hooks';
import { UserVoteType } from '@/types';
import { useEffect, useState } from 'react';

const Vote = () => {
  const user = useUser();
  const [positionsAndOptions, setPositionsAndOptions] = useState(
    new Map<
      string,
      { title: string; options: { id: string; name: string }[] }
    >()
  );
  const [positionsArray, setPositionsArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positionToVote, setPositionToVote] = useState(
    new Map<string, string>()
  );
  const [fetching, setFetching] = useState(true);
  const supabase = useSupabase();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { addSnack } = useSnack();
  const { selector: network } = useNetwork();
  const submitDisabled = saving || !network.isOnline;
  const { selector: election_year } = useElectionYear();

  useEffect(() => {
    const fetchOptionsAndPositions = async () => {
      const { data, error } =
        await supabase.voting_position_option.getVPOsAndTheirPositions(
          election_year.value.id!
        );

      if (!error && data) {
        let postionOptionsMap = new Map();
        let positionToVoteMap = new Map();

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
            positionToVoteMap.set(positionId, '');
          }
        });

        setPositionsAndOptions(postionOptionsMap);
        setPositionToVote(positionToVoteMap);
        setPositionsArray(Array.from(postionOptionsMap.keys()));
      }

      setFetching(false);
    };

    fetchOptionsAndPositions();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((old) => {
      return (old -= 1);
    });
  };

  const handleNext = () => {
    if (currentIndex < positionsArray.length - 1) {
      setCurrentIndex((old) => {
        return (old += 1);
      });
    } else {
      setShowConfirmation(true);
    }
  };

  const handleCheck = (positionId: string, optionId: string) => {
    setPositionToVote((old) => {
      let update = new Map(old);
      update.set(positionId, optionId);
      return update;
    });
  };

  const handleEdit = (index: number) => {
    setCurrentIndex(index);
    setShowConfirmation(false);
  };

  const handleSubmit = async () => {
    setSaving(true);
    let data: UserVoteType[] = [];
    positionToVote.forEach((value, key) => {
      data.push({
        voting_position: key,
        voting_position_option: value,
        user: user.selector.value.id,
        election_year: election_year.value.id,
      });
    });

    const { error } = await supabase.user_vote.submitVotes(data);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    let upsertData = { ...user.selector.value, voted: true };
    const { error: userUpdateError } = await supabase.user.upsertUser(
      upsertData
    );

    if (userUpdateError) {
      setError(userUpdateError.message);
      setSaving(false);
      return;
    }

    addSnack('success', 'Successfully voted!');
    user.setUser(upsertData);
    setSaving(false);
  };

  if (fetching) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="flex flex-col h-full p-2 lg:p-5 gap-2 overflow-auto text-black">
        <div className="flex-auto flex flex-col gap-5">
          <p className="text-3xl font-bold">Confirm & Submit</p>
          {positionsArray.map((p, index) => (
            <div key={p} className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">
                  {positionsAndOptions.get(p)?.title}
                </p>
                <p>
                  {
                    positionsAndOptions
                      .get(p)
                      ?.options.find(
                        (option) => option.id === positionToVote.get(p)
                      )?.name
                  }
                </p>
              </div>
              <button
                className="btn btn-sm btn-ghost btn-primary"
                onClick={() => handleEdit(index)}
              >
                edit
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-black h-full gap-2 overflow-auto">
      {positionsArray.map((p, index) => (
        <div
          key={p}
          className={`flex flex-col h-full p-2 lg:p-5 gap-2 ${
            currentIndex !== index && 'hidden'
          }`}
        >
          <div className="flex-auto flex flex-col gap-5">
            <p className="text-3xl font-bold">{`Choose your vote for ${
              positionsAndOptions.get(p)?.title
            }:`}</p>
            <div className="flex-auto flex flex-col gap-5">
              {positionsAndOptions.get(p)?.options.map((option) => (
                <div key={option.id} className="form-control">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      checked={positionToVote.get(p) === option.id}
                      onChange={() => handleCheck(p, option.id)}
                    />
                    <span className="label-text text-xl text-black font-bold">
                      {option.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex ${
              index === 0 ? 'justify-end' : 'justify-between'
            }`}
          >
            <button
              className={`btn btn-outline btn-sm ${index === 0 && 'hidden'}`}
              onClick={() => handlePrev()}
            >
              prev
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleNext()}
              disabled={!positionToVote.get(p)}
            >
              Next
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vote;
