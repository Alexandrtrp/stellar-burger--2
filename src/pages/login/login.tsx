import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserThunk, registerUserThunk } from '../../services/authSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setData({ email: email, password: password });
  };

  useEffect(() => {
    if (!data.email || !data.password) {
      return;
    }
    dispatch(loginUserThunk(data));
  }, [handleSubmit]);

  if (isAuthenticated) {
    return <Navigate replace to={'/profile'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
