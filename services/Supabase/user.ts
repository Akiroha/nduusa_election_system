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

const extractPhoneNumber = (phone: string) => {
  const cleanedNumber = phone.replace(/[^\d]/g, '').slice(-10);
  return cleanedNumber;
};

export default class User {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  createUser = async (data: UserType) => {
    data.password = generatePassword();
    data.phone = extractPhoneNumber(data.phone!);
    return this.supabase.from(user_table).insert(data);
  };

  createUsers = async (data: UserType[]) => {
    data.forEach((d) => {
      d.password = generatePassword();
      d.phone = extractPhoneNumber(d.phone!);
    });
    return this.supabase.from(user_table).insert(data);
  };

  upsertUser = async (data: object) => {
    return this.supabase.from(user_table).upsert(data);
  };

  getUserByphoneAndPassword = async (phone: string, password: string) => {
    return this.supabase
      .from(user_table)
      .select('*')
      .match({
        phone: extractPhoneNumber(phone),
        password: password.toUpperCase(),
      });
  };

  getUsers = async () => {
    return this.supabase.from(user_table).select('*');
  };

  removeUsers = async (ids: string[]) => {
    return this.supabase.from(user_table).delete().in('id', ids);
  };
}
