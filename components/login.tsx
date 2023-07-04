import { useSupabase, useUser } from '@/hooks';
import { useState } from 'react';

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const Login = () => {
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const disabled =
    phone === '' || !phoneRegex.test(phone) || pass === '' || fetching;
  const supabase = useSupabase();
  const { setUser } = useUser();

  const handleSubmit = async () => {
    setFetching(true);
    // handle supabase query
    // if no user is found, display error
    // if user is found, update user in store + change view
    const { data, error } = await supabase.user.getUserByphoneAndPassword(
      phone.trim(),
      pass.trim()
    );

    if (error) {
      setError(error.message);
      setFetching(false);
      return;
    }

    if (data.length === 0) {
      setError(
        'There is no user with this phone number and password combination. Please try again or reach out to the admins.'
      );
    } else {
      setUser(data[0]);
    }

    setFetching(false);
  };

  return (
    <div className="flex flex-col text-black h-full items-center justify-center gap-2">
      <div className="form-control">
        <label className="label label-text text-black font-bold">
          Phone Number
        </label>
        <input
          className="border-2 border-black rounded-lg bg-white p-1"
          type="tel"
          autoComplete="new-password"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label label-text text-black font-bold">
          Password
        </label>
        <input
          className="border-2 border-black rounded-lg bg-white p-1"
          type="password"
          autoComplete="new-password"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
        />
      </div>
      <button
        className="btn bg-black btn-sm my-4 text-white"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <p className="text-red-500 font-bold text-center">{error}</p>}
    </div>
  );
};

export default Login;
