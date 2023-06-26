import Supabase from '../services/Supabase';

const useSupabase = () => {
  const supabase = new Supabase();
  return supabase;
};

export default useSupabase;
