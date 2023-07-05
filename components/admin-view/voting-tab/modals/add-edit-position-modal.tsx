import { useNetwork, useSnack, useSupabase } from '@/hooks';
import { VotingPositionType } from '@/types';
import { useState } from 'react';

interface Props {
  selectedPosition: VotingPositionType | null;
  handleResetState: Function;
}

const AddEditPositionModal = ({
  selectedPosition,
  handleResetState,
}: Props) => {
  const [pTitle, setPTitle] = useState(selectedPosition?.title ?? '');
  const [saving, setSaving] = useState(false);
  const title = selectedPosition ? 'Edit Position' : 'Add New Position';
  const { addSnack } = useSnack();
  const { selector: network } = useNetwork();
  const disabled = saving || pTitle.length === 0 || !network.isOnline;
  const [error, setError] = useState('');
  const supabase = useSupabase();

  const handleAdd = async () => {
    setSaving(true);

    let data = selectedPosition
      ? { ...selectedPosition, title: pTitle }
      : {
          title: pTitle,
        };

    const { error: creationError } =
      await supabase.voting_position.upsertPosition(data);

    if (creationError) {
      setError(creationError.message);
      setSaving(false);
    } else {
      handleResetState();
      addSnack(
        'success',
        selectedPosition
          ? 'Position successfully updated!'
          : 'Position successfully added!'
      );
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="form-control">
          <label className="label label-text text-black font-bold">
            Position Title
          </label>
          <input
            className="border-2 border-black rounded-lg bg-white p-1"
            type="text"
            autoComplete="new-password"
            value={pTitle}
            onChange={(event) => setPTitle(event.target.value)}
          />
        </div>
        {error && <p className="text-red-500 font-bold text-center">{error}</p>}
        <div className="modal-action">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleResetState()}
          >
            cancel
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleAdd()}
            disabled={disabled}
          >
            confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddEditPositionModal;
