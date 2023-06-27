import { useSupabase, useUser } from '@/hooks';
import { UserType } from '@/types';
import { useState } from 'react';

interface Props {
  handleResetState: Function;
  selectedUser: UserType | null;
  selectedUsers: string[] | null;
}

const RemoveUserModal = ({
  handleResetState,
  selectedUser,
  selectedUsers,
}: Props) => {
  const supabase = useSupabase();
  const { selector } = useUser();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const title = selectedUser ? 'Remove User' : 'Remove Users';
  const body = selectedUser
    ? `Are you sure you want to remove ${selectedUser.name}?`
    : `Are you sure that you want to remove ${selectedUsers?.length} users?`;
  const disabled = deleting;

  const handleDelete = async () => {
    setDeleting(true);
    const ids = selectedUser ? [selectedUser.id] : selectedUsers;
    if (!ids) {
      handleResetState();
      return;
    }

    const userIndex = ids.findIndex((i) => i === selector.value.id);

    if (userIndex !== -1) {
      ids.splice(userIndex, 1);
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      handleResetState();
      return;
    }

    const { error } = await supabase.user.removeUsers(ids);

    if (error) {
      setError(error.message);
    } else {
      handleResetState();
    }

    setDeleting(false);
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{body}</p>
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
            onClick={() => handleDelete()}
            disabled={disabled}
          >
            remove
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RemoveUserModal;
