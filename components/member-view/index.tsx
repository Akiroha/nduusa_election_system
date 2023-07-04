import { useUser } from '@/hooks';
import CastVote from '../cast-vote';

const MemberView = () => {
  const { selector: userSelector } = useUser();

  return (
    <div className="flex flex-col flex-auto gap-2 h-full">
      <p className="text-black text-xl lg:text-2xl">
        Hello {userSelector.value.name}
      </p>
      <CastVote />
    </div>
  );
};

export default MemberView;
