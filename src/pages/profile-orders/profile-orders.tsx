import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.burgers.myOrders);
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
