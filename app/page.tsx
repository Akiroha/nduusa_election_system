'use client';

import AdminView from '@/components/admin-view';
import Login from '@/components/login';
import RegularMemberView from '@/components/regular-member-view';
import { useOrg, useSupabase, useUser } from '@/hooks';
import { useEffect, useState } from 'react';

const Home = () => {
  const { setOrg } = useOrg();
  const supabase = useSupabase();
  const [fetchingOrg, setFetchingOrg] = useState(true);
  const user = useUser();
  const userAuthorized = !!user.selector.value.id;
  const userType = user?.selector?.value?.type;

  useEffect(() => {
    const fetchOrg = async () => {
      const { data, error } = await supabase.organization.getOrganization();
      if (!error && data) {
        setOrg(data);
      }

      setFetchingOrg(false);
    };

    fetchOrg();
  }, []);

  if (fetchingOrg) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-2">
      <p className="text-black text-3xl lg:text-6xl font-bold text-center">
        Welcome to the NDUUSA 2023 Elections
      </p>

      {!userAuthorized && <Login />}

      {userAuthorized && userType === 'admin' && <AdminView />}

      {userAuthorized && userType === 'member' && <RegularMemberView />}
    </div>
  );
};

export default Home;
