import { useEffect } from 'react';
import useSupabase from './useSupabase';

const useSubscribe = (table: string, callback: Function, filter?: string) => {
  const { getSupabase } = useSupabase();
  const supabase = getSupabase();

  useEffect(() => {
    const channel = supabase
      .channel(`${table} realtime`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filter,
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
};

export default useSubscribe;
