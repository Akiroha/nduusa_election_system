import { UserType } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';

const user_table = 'user';

const generatePassword = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

export default class User {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  createUser = async (data: UserType) => {
    data.password = generatePassword();
    return this.supabase.from(user_table).insert(data);
  };

  upsertUser = async (data: object) => {
    return this.supabase.from(user_table).upsert(data);
  };

  getUserByEmailAndPassword = async (email: string, password: string) => {
    return this.supabase
      .from(user_table)
      .select('*')
      .match({ email: email, password: password });
  };

  getUsers = async () => {
    return this.supabase.from(user_table).select('*');
  };

  removeUsers = async (ids: string[]) => {
    return this.supabase.from(user_table).delete().in('id', ids);
  };
}
