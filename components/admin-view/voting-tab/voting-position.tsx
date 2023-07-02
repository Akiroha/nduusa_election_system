import { VotingPositionOptionType, VotingPositionType } from '@/types';
import { useEffect, useState } from 'react';
import AddEditPositionModal from './modals/add-edit-position-modal';
import RemovePositionModal from './modals/remove-position-modal';
import VotingPositionOption from './voting-position-option';
import { useSupabase } from '@/hooks';
import AddEditVpoModal from './modals/add-edit-vpo-modal';

interface Props {
  position: VotingPositionType;
}

const VotingPosition = ({ position }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<VotingPositionOptionType[]>([]);
  const [showRemovePositionModal, setShowRemovePositionModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showEditPositionModal, setEditPositionModal] = useState(false);
  const [fetching, setFetching] = useState(true);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchOptions = async () => {
      const { data, error } =
        await supabase.voting_position_option.getVPOsByVotingPosition(
          position.id!
        );

      if (!error && data) {
        setOptions(data);
      }

      setFetching(false);
    };

    fetchOptions();
  }, []);

  const toggleOpen = () => {
    setOpen((old) => {
      return !old!;
    });
  };

  const handleResetState = () => {
    setShowRemovePositionModal(false);
    setShowOptionModal(false);
    setEditPositionModal(false);
  };

  const handleOptionCrud = (
    action: 'add' | 'edit' | 'delete',
    newOption: VotingPositionOptionType
  ) => {
    setOptions((oldArr) => {
      if (!oldArr) return oldArr;
      let update = [...oldArr];

      switch (action) {
        case 'add':
          update.push(newOption);
          return update;
        case 'edit':
        case 'delete':
          let oldIndex = update.findIndex(
            (option) => option.id === newOption.id
          );

          if (oldIndex === -1) return update;

          if (action === 'delete') {
            update.splice(oldIndex, 1);
          } else {
            update[oldIndex] = newOption;
          }

          return update;
      }
    });
  };

  return (
    <div
      className={`collapse ${
        open && 'collapse-open'
      } text-black collapse-arrow shadow-md`}
      style={{ overflow: 'unset' }}
    >
      <div
        className="collapse-title text-xl font-medium cursor-pointer"
        onClick={toggleOpen}
      >
        {position.title}
      </div>
      <div className="collapse-content flex flex-col">
        <div className="flex justify-between">
          <div className="join">
            <button
              className="btn btn-xs btn-error join-item"
              onClick={() => setShowRemovePositionModal(true)}
            >
              remove
            </button>
            <button
              className="btn btn-xs btn-primary join-item"
              onClick={() => setEditPositionModal(true)}
            >
              edit
            </button>
          </div>
          <button
            className="btn btn-xs btn-primary"
            onClick={() => setShowOptionModal(true)}
          >
            Add option
          </button>
        </div>
        {fetching ? (
          <div className="flex flex-col items-center justify-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-2">
            <p className="font-bold">Options</p>
            {options.map((option) => (
              <VotingPositionOption
                key={option.id}
                option={option}
                handleOptionCrud={handleOptionCrud}
              />
            ))}
          </div>
        )}
      </div>

      {showEditPositionModal && (
        <AddEditPositionModal
          selectedPosition={position}
          handleResetState={handleResetState}
        />
      )}

      {showRemovePositionModal && (
        <RemovePositionModal
          position={position}
          handleResetState={handleResetState}
        />
      )}

      {showOptionModal && (
        <AddEditVpoModal
          selectedVpo={null}
          voting_position={position.id!}
          handleResetState={handleResetState}
          handleOptionCrud={handleOptionCrud}
        />
      )}
    </div>
  );
};
export default VotingPosition;
