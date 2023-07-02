import { useSupabase } from '@/hooks';
import { VotingPositionOptionType } from '@/types';
import { useState } from 'react';

interface Props {
  selectedVpo: VotingPositionOptionType;
  handleResetState: Function;
  handleOptionCrud: Function;
}

const RemoveOptionModal = ({
  selectedVpo,
  handleResetState,
  handleOptionCrud,
}: Props) => {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState('');
  const supabase = useSupabase();
  const disabled = removing;

  const handleRemove = async () => {
    setRemoving(true);

    const { error: removalError } =
      await supabase.voting_position_option.removeVPO(selectedVpo.id!);

    if (removalError) {
      setError(removalError.message);
      setRemoving(false);
    } else {
      handleOptionCrud('delete', selectedVpo);
      handleResetState();
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Remove Position Option</h3>
        <div>{`Are you sure that you want to remove the position option ${selectedVpo.name}?`}</div>
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

export default RemoveOptionModal;
