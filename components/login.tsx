import { useNetwork, useSnack, useSupabase, useUser } from '@/hooks';
import Image from 'next/image';
import { useState } from 'react';
const nduusa_logo = '/nduusa_logo.jpeg';

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const Login = () => {
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const network = useNetwork();
  const disabled =
    phone === '' ||
    !phoneRegex.test(phone) ||
    pass === '' ||
    fetching ||
    !network.selector.isOnline;
  const supabase = useSupabase();
  const { setUser } = useUser();
  const { addSnack } = useSnack();
  const [showPassword, setShowPassword] = useState(false);

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
      addSnack('success', 'Login Successful!');
    }

    setFetching(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((old) => {
      return !old;
    });
  };

  return (
    <div className="flex flex-col text-black h-full items-center justify-center gap-2">
      <Image src={nduusa_logo} alt="NDUUSA Logo" width={200} height={200} />
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
      <div className="form-control relative">
        <label className="label label-text text-black font-bold">
          Password
        </label>
        <input
          className="border-2 border-black rounded-lg bg-white p-1"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
        />
        {showPassword ? (
          <HidePassword toggleShowPassword={toggleShowPassword} />
        ) : (
          <ShowPassword toggleShowPassword={toggleShowPassword} />
        )}
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

const ShowPassword = ({
  toggleShowPassword,
}: {
  toggleShowPassword: Function;
}) => {
  return (
    <button
      className="absolute bottom-2 right-2"
      onClick={() => toggleShowPassword()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path
          fillRule="evenodd"
          d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

const HidePassword = ({
  toggleShowPassword,
}: {
  toggleShowPassword: Function;
}) => {
  return (
    <button
      className="absolute bottom-2 right-2"
      onClick={() => toggleShowPassword()}
    >
      {' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
          clipRule="evenodd"
        />
        <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
      </svg>
    </button>
  );
};

export default Login;
