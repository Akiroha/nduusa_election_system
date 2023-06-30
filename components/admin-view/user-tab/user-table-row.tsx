import { useDropdown, useUser } from '@/hooks';
import { UserType } from '@/types';
import { useRef } from 'react';

interface Props {
  user: UserType;
  optionClick: Function;
  selected: boolean;
  toggleSelect: Function;
}

const UserTableRow = ({ user, optionClick, selected, toggleSelect }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdown = useDropdown(mainRef, dropdownRef);
  const { selector } = useUser();

  const handleOptionClick = (value: string) => {
    optionClick(value, user);
    dropdown.close();
  };

  const getDropdownOptions = () => {
    let options = [
      {
        value: 'update',
        label: 'Update',
      },
      {
        value: 'send',
        label: 'Send Password',
      },
    ];

    if (user.type !== 'admin') {
      options.unshift({
        value: 'remove',
        label: 'Remove',
      });
    }
    return options;
  };

  return (
    <tr key={user.id}>
      <th className="max-w-[1rem] whitespace-normal">
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-xs lg:checkbox-sm checkbox-primary"
            checked={selected}
            onChange={() => toggleSelect(user.id)}
          />
        </label>
      </th>
      <td>{user.name}</td>
      <td>{user.branch}</td>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-xs checkbox-primary cursor-default"
          checked={user.active}
          onChange={() => {}}
        />
      </td>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-xs checkbox-primary cursor-default"
          checked={user.voted}
          onChange={() => {}}
        />
      </td>
      {selector.value.id !== user.id && (
        <th className="max-w-[1rem] whitespace-normal">
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
              {getDropdownOptions().map((option) => {
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
        </th>
      )}
    </tr>
  );
};

export default UserTableRow;
