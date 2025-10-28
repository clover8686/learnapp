import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isEmail } from '../../utils/validators';

const DUMMY_EMAIL = 'admin@admin.com';
const DUMMY_PASS = '123456';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email:false, password:false });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailError = touched.email && !email ? 'Email không được để trống' : touched.email && !isEmail(email) ? 'Email không hợp lệ' : '';
  const passError = touched.password && !password ? 'Password không được để trống' : touched.password && password.length < 6 ? 'Password cần ít nhất 6 ký tự' : '';

  const formInvalid = !!emailError || !!passError || !email || !password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (formInvalid) return;
    if (email === DUMMY_EMAIL && password === DUMMY_PASS) {
      login(email);
      navigate('/', { replace: true });
    } else {
      setError('Email hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-3">
          <span className="text-sm font-medium">Email</span>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            onBlur={()=>setTouched(t=>({...t, email:true}))}
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="you@example.com"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium">Mật khẩu</span>
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            onBlur={()=>setTouched(t=>({...t, password:true}))}
            type="password"
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
            placeholder="Nhập mật khẩu"
          />
          {passError && <p className="text-red-500 text-sm mt-1">{passError}</p>}
        </label>

        <button
          type="submit"
          disabled={formInvalid}
          className={`w-full py-2 rounded-md text-white ${formInvalid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Login
        </button>

      </form>
    </div>
  );
}
