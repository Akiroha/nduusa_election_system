import { UserType } from '@/types';

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
  return <div></div>;
};

export default SendPasswordModal;
