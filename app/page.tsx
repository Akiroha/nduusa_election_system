'use client';

import Login from '@/components/login';

const Home = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="text-black text-3xl lg:text-6xl font-bold text-center">
        Welcome to the NDUUSA 2023 Elections
      </div>

      {/* view displayed will depend on whether or not user is authenticated or not */}
      <Login />
    </div>
  );
};

export default Home;
