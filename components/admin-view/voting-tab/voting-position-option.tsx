import { useDropdown } from '@/hooks';
import { VotingPositionOptionType } from '@/types';
import { useRef, useState } from 'react';
import AddEditVpoModal from './modals/add-edit-vpo-modal';
import RemoveOptionModal from './modals/remove-option-modal';

const dropdownOptions = [
  {
    value: 'update',
    label: 'Update',
  },
  {
    value: 'remove',
    label: 'Remove',
  },
];

interface Props {
  option: VotingPositionOptionType;
  handleOptionCrud: Function;
}

const VotingPositionOption = ({ option, handleOptionCrud }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdown = useDropdown(mainRef, dropdownRef);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleOptionClick = (value: string) => {
    dropdown.close();

    switch (value) {
      case 'update':
        setShowOptionModal(true);
        break;
      case 'remove':
        setShowRemoveModal(true);
        break;
    }
  };

  const handleResetState = () => {
    setShowOptionModal(false);
    setShowRemoveModal(false);
  };

  return (
    <div className="flex justify-between items-center p-2 rounded-full shadow-md">
      <div>{option.name}</div>
      <div className={dropdown.mainClass} ref={mainRef}>
        <label
          tabIndex={0}
          className="cursor-pointer text-white dark:text-black"
          onClick={() => dropdown.open()}
          onBlur={(e) => dropdown.blur(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-1 bg-white shadow rounded-box w-auto"
          ref={dropdownRef}
        >
          {dropdownOptions.map((option) => {
            return (
              <li key={option.value} className="text-black ">
                <a onClick={() => handleOptionClick(option.value)}>
                  {option.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {showOptionModal && (
        <AddEditVpoModal
          selectedVpo={option}
          voting_position={option.voting_position!}
          handleResetState={handleResetState}
          handleOptionCrud={handleOptionCrud}
        />
      )}

      {showRemoveModal && (
        <RemoveOptionModal
          selectedVpo={option}
          handleResetState={handleResetState}
          handleOptionCrud={handleOptionCrud}
        />
      )}
    </div>
  );
};

export default VotingPositionOption;
