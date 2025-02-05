import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk } from '../../services/burgerSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.burgers.orders);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getFeedsThunk());
  // }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />
  );
};
