import { useUser } from '@/hooks';
import { useState } from 'react';
import Users from './user-tab';
import VotingOptions from './voting-tab';
import CastVote from '../cast-vote';

const tabOptions = [
  { value: 'users', title: 'Users' },
  { value: 'voting', title: 'Voting Options' },
  { value: 'vote', title: 'Vote/Results' },
];

const AdminView = () => {
  const { selector: userSelector } = useUser();
  const [tab, setTab] = useState('users');

  return (
    <div className="flex flex-col flex-auto gap-2 overflow-hidden">
      <p className="text-black text-xl lg:text-2xl">
        Hello {userSelector.value.name}
      </p>
      <div className="tabs">
        {tabOptions.map((option) => (
          <a
            key={option.value}
            className={`tab tab-lifted font-bold text-black ${
              tab === option.value && 'tab-active text-white'
            }`}
            onClick={() => setTab(option.value)}
          >
            {option.title}
          </a>
        ))}
      </div>
      {tab === 'users' && <Users />}
      {tab === 'voting' && <VotingOptions />}
      {tab === 'vote' && <CastVote />}
    </div>
  );
};

export default AdminView;
