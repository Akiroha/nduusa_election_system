import { VotingPositionOptionType, VotingPositionType } from '@/types';
import { useState } from 'react';
import AddEditPositionModal from './modals/add-edit-position-modal';
import RemovePositionModal from './modals/remove-position-modal';

interface Props {
  position: VotingPositionType;
}

const VotingPosition = ({ position }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<VotingPositionOptionType[]>([]);
  const [showRemovePositionModal, setShowRemovePositionModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showEditPositionModal, setEditPositionModal] = useState(false);

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

  return (
    <div
      className={`collapse ${
        open && 'collapse-open'
      } text-black collapse-arrow shadow-md`}
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
        <div className="flex flex-col gap-2"></div>
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
    </div>
  );
};
export default VotingPosition;
