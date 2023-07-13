'use client';

import AdminView from '@/components/admin-view';
import Login from '@/components/login';
import MemberView from '@/components/member-view';
import { useElectionYear, useSupabase, useUser } from '@/hooks';
import { useEffect, useState } from 'react';

const Home = () => {
  const { setElectionYear } = useElectionYear();
  const supabase = useSupabase();
  const [fetchingElectionYear, setFetchingElectionYear] = useState(true);
  const user = useUser();
  const userAuthorized = !!user.selector.value.id;
  const userType = user?.selector?.value?.type;
  const thisYear = new Date().getFullYear().toString();

  useEffect(() => {
    const fetchElectionYear = async () => {
      const { data, error } = await supabase.electiion_year.getElectionYear(
        thisYear
      );
      if (!error && data) {
        setElectionYear(data);
      }

      setFetchingElectionYear(false);
    };

    fetchElectionYear();
  }, []);

  if (fetchingElectionYear) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <p className="text-black text-3xl lg:text-6xl font-bold text-center">
        {`Welcome to the NDUUSA ${thisYear} Elections`}
      </p>

      {!userAuthorized && <Login />}

      {userAuthorized && userType === 'admin' && <AdminView />}

      {userAuthorized && userType === 'member' && <MemberView />}
    </div>
  );
};

export default Home;
