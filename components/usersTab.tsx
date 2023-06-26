import { useDropdown, useSupabase } from '@/hooks';
import { UserType } from '@/types';
import { useEffect, useRef, useState } from 'react';
import AddUserModal from './add-user-modal';

const dropdownOptions = [
  {
    value: 'remove',
    label: 'Remove',
  },
  {
    value: 'update',
    label: 'Update',
  },
  {
    value: 'send',
    label: 'Send Password',
  },
];

const Users = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>();
  const [selected, setSelected] = useState<UserType[]>();
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState('');
  const supabase = useSupabase();
  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdown = useDropdown(mainRef, dropdownRef);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.user.getUsers();

      if (!error && data) {
        setUsers(data);
      }

      setFetching(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users
        ?.filter((user) =>
          user.name?.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => a.name!.localeCompare(b.name!))
    );
  }, [users, filter]);

  const handleOptionClick = (value: string) => {};

  if (fetching) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full rounded-xl shadow-2xl">
      <div className="flex flex-wrap gap-2 justify-between align-middle">
        <input
          className="border-2 border-black rounded-lg bg-white pl-1 text-black"
          type="search"
          placeholder="Filter users"
          onChange={(event) => setFilter(event.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Add user
          </button>
          <button className="btn btn-sm btn-primary">Upload user file</button>
        </div>
      </div>
      <div className="text-black h-full overflow-scroll">
        <table className="table w-full table-xs md:table-md lg:table-lg overflow-x-auto">
          <thead className="text-black">
            <tr>
              <th className="max-w-[1rem] whitespace-normal">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs lg:checkbox-sm checkbox-primary"
                  />
                </label>
              </th>
              <th>Name</th>
              <th>Branch</th>
              <th>Active</th>
              <th>Voted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.id}>
                <th className="max-w-[1rem] whitespace-normal">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs lg:checkbox-sm checkbox-primary"
                    />
                  </label>
                </th>
                <td>{user.name}</td>
                <td>{user.branch}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-primary cursor-default"
                    checked={user.actiive}
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
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddUserModal setShowAddModal={setShowAddModal} />}
    </div>
  );
};

export default Users;
