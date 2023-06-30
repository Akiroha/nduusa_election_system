import { useSupabase } from '@/hooks';
import { VotingPositionType } from '@/types';
import { useState } from 'react';

interface Props {
  position: VotingPositionType;
  handleResetState: Function;
}

const RemovePositionModal = ({ position, handleResetState }: Props) => {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState('');
  const disabled = removing;
  const supabase = useSupabase();

  const handleRemove = async () => {
    setRemoving(true);

    const { error: removalError } =
      await supabase.voting_position.removePosition(position.id!);

    if (removalError) {
      setError(removalError.message);
      setRemoving(false);
    } else {
      handleResetState();
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Remove Position</h3>
        <div>{`Are you sure that you want to remove the position ${position.title}? All of its options will be subsequently deleted.`}</div>
        {error && <p className="text-red-500 font-bold text-center">{error}</p>}
        <div className="modal-action">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleResetState()}
          >
            cancel
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleRemove()}
            disabled={disabled}
          >
            remove
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RemovePositionModal;
