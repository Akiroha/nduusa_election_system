import { useSupabase } from '@/hooks';
import { UserType } from '@/types';
import { useEffect, useState } from 'react';
import UserTableRow from './user-table-row';

import AddEditUserModal from './modals/add-edit-user-modal';
import RemoveUserModal from './modals/remover-user-modal';
import UploadFileModal from './modals/upload-file-modal';
import SendPasswordModal from './modals/send-password-modal';

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState('');
  const supabase = useSupabase();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSendPasswords, setShowSendPasswords] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.user.getUsers();

      if (!error && data) {
        setUsers(data);
      }

      setFetching(false);
    };

    fetchUsers();

    const handleEvent = async (payload: any) => {
      const { eventType, new: newValue, old } = payload;

      switch (eventType) {
        case 'INSERT':
          setUsers((update) => {
            if (!update) return update;
            return [...update].concat(newValue satisfies UserType);
          });
          break;
        case 'UPDATE':
          setUsers((oldArr) => {
            if (!oldArr) return oldArr;
            const update = [...oldArr];
            const oldUserIndex = update.findIndex((e) => e.id === old.id);

            if (oldUserIndex === -1) return update;

            update[oldUserIndex] = newValue;
            return update;
          });
          break;
        case 'DELETE':
          setUsers((oldArr) => {
            if (!oldArr) return oldArr;
            const update = [...oldArr];
            const oldUserIndex = update.findIndex((e) => e.id === old.id);

            if (oldUserIndex === -1) return update;

            update.splice(oldUserIndex, 1);
            return update;
          });

          break;
      }
    };

    const supa = supabase.getSupabase();
    const channel = supa
      .channel('realtime user')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user',
        },
        (payload) => {
          handleEvent(payload);
        }
      )
      .subscribe();

    return () => {
      supa.removeChannel(channel);
    };
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

  useEffect(() => {
    setAllSelected(() => {
      if (selectedUsers?.length === 0) return false;
      return filteredUsers?.every((user) => selectedUsers?.includes(user.id!))!;
    });
  }, [selectedUsers, filteredUsers]);

  const handleUserMenuOptionClick = (value: string, user: UserType) => {
    setSelectedUser(user);

    switch (value) {
      case 'update':
        setShowAddModal(true);
        break;
      case 'remove':
        setShowRemoveModal(true);
        break;
      case 'send':
        setShowSendPasswords(true);
        break;
    }
  };

  const handleResetState = () => {
    setSelectedUser(null);
    setShowAddModal(false);
    setShowRemoveModal(false);
    setShowUploadModal(false);
    setShowSendPasswords(false);

    if (selectedUsers.length > 0) {
      setSelectedUsers([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedUsers((old) => {
      if (!old) return old;
      let update = [...old];
      let index = update.findIndex((userId) => userId === id);

      if (index === -1) {
        update.push(id);
      } else {
        update.splice(index, 1);
      }
      return update;
    });
  };

  const toggleSelectAll = () => {
    setSelectedUsers(() => {
      if (allSelected) {
        return [];
      } else {
        return filteredUsers?.map((user) => user.id!);
      }
    });
  };

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
        {selectedUsers.length !== 0 ? (
          <div className="join">
            <button
              className="btn btn-xs lg:btn-sm btn-error join-item"
              onClick={() => setShowRemoveModal(true)}
            >
              Remove Selected
            </button>
            <button
              className="btn btn-xs lg:btn-sm btn-primary join-item"
              onClick={() => setShowSendPasswords(true)}
            >
              Send Passwords
            </button>
          </div>
        ) : (
          <div className="join">
            <button
              className="btn btn-xs lg:btn-sm btn-primary join-item"
              onClick={() => setShowAddModal(true)}
            >
              Add user
            </button>
            <button
              className="btn btn-xs lg:btn-sm btn-primary join-item"
              onClick={() => setShowUploadModal(true)}
            >
              Upload user file
            </button>
          </div>
        )}
      </div>
      <div className="text-black h-full overflow-auto p-1">
        <table className="table w-full table-xs md:table-md lg:table-lg overflow-auto">
          <thead className="text-black">
            <tr>
              <th className="max-w-[1rem] whitespace-normal">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs lg:checkbox-sm checkbox-primary"
                    checked={allSelected}
                    onChange={toggleSelectAll}
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
              <UserTableRow
                key={user.id}
                user={user}
                optionClick={handleUserMenuOptionClick}
                selected={selectedUsers?.includes(user.id!)!}
                toggleSelect={toggleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddEditUserModal
          selectedUser={selectedUser}
          handleResetState={handleResetState}
        />
      )}

      {showRemoveModal && (
        <RemoveUserModal
          selectedUser={selectedUser}
          handleResetState={handleResetState}
          selectedUsers={selectedUsers}
        />
      )}

      {showSendPasswords && (
        <SendPasswordModal
          selectedUser={selectedUser}
          handleResetState={handleResetState}
          selectedUsers={[
            ...users.filter((user) => selectedUsers.includes(user.id!)),
          ]}
        />
      )}

      {showUploadModal && (
        <UploadFileModal handleResetState={handleResetState} />
      )}
    </div>
  );
};

export default Users;
