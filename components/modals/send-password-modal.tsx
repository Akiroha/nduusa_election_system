import { UserType } from '@/types';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  handleResetState: Function;
  selectedUser: UserType | null;
  selectedUsers: string[] | null;
}

const SendPasswordModal = ({
  handleResetState,
  selectedUser,
  selectedUsers,
}: Props) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const title = selectedUser ? 'Send Password' : 'Send Passwords';
  const body = selectedUser
    ? `Are you sure you want to send ${selectedUser.name} a message?`
    : `Are you sure that you want to send ${selectedUsers?.length} users their passwords?`;

  const handleSend = async () => {
    setSending(true);
    setError('');

    try {
      const res = await axios({
        method: 'post',
        url: '/api/twilio',
        data: JSON.stringify({ name: 'hi', phone: 'sup dude' }),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      console.log('res: ', res);

      handleResetState();
    } catch (error) {
      // console.log('error: ', error);
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
            disabled={sending}
          >
            Send password
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SendPasswordModal;
