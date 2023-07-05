import { useNetwork, useSnack, useSupabase } from '@/hooks';
import { VotingPositionOptionType } from '@/types';
import { useState } from 'react';

interface Props {
  selectedVpo: VotingPositionOptionType | null;
  handleResetState: Function;
  voting_position: string;
  handleOptionCrud: Function;
}

const AddEditVpoModal = ({
  selectedVpo,
  handleResetState,
  voting_position,
  handleOptionCrud,
}: Props) => {
  const [name, setName] = useState(selectedVpo?.name ?? '');
  const [saving, setSaving] = useState(false);
  const title = selectedVpo
    ? 'Edit Position Option'
    : 'Add New Position Option';
  const { addSnack } = useSnack();
  const { selector: network } = useNetwork();
  const disabled = saving || name.length === 0 || !network.isOnline;
  const [error, setError] = useState('');
  const supabase = useSupabase();

  const handleAdd = async () => {
    setSaving(true);

    let data = selectedVpo
      ? { ...selectedVpo, name: name, voting_position: voting_position }
      : {
          name: name,
          voting_position: voting_position,
        };

    const { data: newOption, error: creationError } =
      await supabase.voting_position_option.upsertVotingPositionOption(data);

    if (creationError) {
      setError(creationError.message);
      setSaving(false);
    } else {
      const action = selectedVpo ? 'edit' : 'add';
      handleOptionCrud(action, newOption[0]);
      handleResetState();
      addSnack(
        'success',
        selectedVpo
          ? 'Position option successfully updated!'
          : 'Position option successfully added!'
      );
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="form-control">
          <label className="label label-text text-black font-bold">
            Position Option Name
          </label>
          <input
            className="border-2 border-black rounded-lg bg-white p-1"
            type="text"
            autoComplete="new-password"
            value={name}
            onChange={(event) => setName(event.target.value)}
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

export default AddEditVpoModal;
