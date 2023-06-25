import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const disabled = email === '' || pass === '';

  const handleSubmit = () => {
    // handle supabase query
    // if no user is found, display error
    // if user is found, update user in store + change view
  };

  return (
    <div className="flex flex-col text-black h-full items-center justify-center gap-2">
      <div className="form-control">
        <label className="label label-text text-black font-bold">
          Email Address
        </label>
        <input
          className="border-2 border-black rounded-lg bg-white p-1"
          type="email"
          autoComplete="new-password"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
        className="btn bg-black btn-sm mt-4 text-white"
        disabled={disabled}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
