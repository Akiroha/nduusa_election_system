import { UserType } from '@/types';
import { useState } from 'react';
import axios from 'axios';
import { useNetwork, useSnack } from '@/hooks';

interface Props {
  handleResetState: Function;
  selectedUser: UserType | null;
  selectedUsers: UserType[] | null;
}

const SendPasswordModal = ({
  handleResetState,
  selectedUser,
  selectedUsers,
}: Props) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const { addSnack } = useSnack();
  const { selector: network } = useNetwork();
  const disabled = sending || !network.isOnline;

  const title = selectedUser ? 'Send Password' : 'Send Passwords';
  const body = selectedUser
    ? `Are you sure you want to send ${selectedUser.name} a message?`
    : `Are you sure that you want to send ${selectedUsers?.length} users their passwords?`;

  const handleSend = async () => {
    setSending(true);
    setError('');

    let body;

    if (selectedUser) {
      body = [
        {
          name: selectedUser.name,
          phone: selectedUser.phone,
          pass: selectedUser.password,
        },
      ];
    } else {
      body = selectedUsers?.map((user) => ({
        name: user.name,
        phone: user.phone,
        pass: user.password,
      }));
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/api/twilio',
        data: JSON.stringify(body),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      if (res.status === 200) {
        handleResetState();
        addSnack('success', 'Passwords successfully sent!');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }

    setSending(false);
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
            className="btn btn-sm btn-primary"
            onClick={() => handleSend()}
            disabled={disabled}
          >
            Send password
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SendPasswordModal;
