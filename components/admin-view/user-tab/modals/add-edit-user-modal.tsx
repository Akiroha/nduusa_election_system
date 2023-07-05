import { useNetwork, useSnack, useSupabase } from '@/hooks';
import { UserType } from '@/types';
import { useState } from 'react';

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const branchOptions = [
  { value: 'NJ', label: 'NJ' },
  { value: 'MA', label: 'MA' },
  { value: 'NY', label: 'NY' },
  { value: 'SOUTH', label: 'South' },
];

interface Props {
  selectedUser: UserType | null;
  handleResetState: Function;
}

const AddEditUserModal = ({ selectedUser, handleResetState }: Props) => {
  const [name, setName] = useState(selectedUser?.name ?? '');
  const [phone, setPhone] = useState(selectedUser?.phone ?? '');
  const [branch, setBranch] = useState(selectedUser?.branch ?? '');
  const [active, setActive] = useState(selectedUser?.active ?? false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const supabase = useSupabase();
  const { addSnack } = useSnack();
  const network = useNetwork();

  const title = selectedUser ? 'Edit Member' : 'Add New Member';
  const body = selectedUser
    ? 'Fill out the form to edit the member.'
    : 'Fill out the form to add a new member.';

  const disabled =
    name === '' ||
    branch === '' ||
    phone === '' ||
    !phoneRegex.test(phone) ||
    creating ||
    !network.selector.isOnline;

  const handleAdd = async () => {
    setCreating(true);

    let data = selectedUser
      ? {
          ...selectedUser,
          name: name.trim(),
          phone: phone.trim(),
          branch: branch,
          active: active,
        }
      : {
          name: name.trim(),
          phone: phone.trim(),
          branch: branch,
          active: active,
        };

    const { error: creationError } = selectedUser
      ? await supabase.user.upsertUser(data)
      : await supabase.user.createUser(data);

    if (creationError) {
      setError(creationError.message);
      setCreating(false);
    } else {
      handleResetState();
      addSnack(
        'success',
        selectedUser
          ? 'User succesfully updated!'
          : 'User successfully created!'
      );
    }
  };

  return (
    <dialog className="modal modal-open text-black">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{body}</p>
        <div className="flex flex-col">
          <div className="form-control">
            <label className="label label-text text-black font-bold">
              Member Name
            </label>
            <input
              className="border-2 border-black rounded-lg bg-white p-1"
              type="text"
              autoComplete="new-password"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label label-text text-black font-bold">
              Phone Number
            </label>
            <input
              className="border-2 border-black rounded-lg bg-white p-1"
              type="tel"
              autoComplete="new-password"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label label-text text-black font-bold">
              Branch
            </label>
            <select
              className="border-2 border-black rounded-lg bg-white p-1"
              autoComplete="new-password"
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
            >
              <option value="">--</option>
              {branchOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control w-full mt-2">
            <label className="cursor-pointer label">
              <span className=" label-text text-black font-bold">
                Are they financially active?
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
              />
            </label>
          </div>

          {error && (
            <p className="text-red-500 font-bold text-center">{error}</p>
          )}
        </div>
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
export default AddEditUserModal;
