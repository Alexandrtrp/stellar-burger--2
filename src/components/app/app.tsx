import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getFeedsThunk,
  getIngredientsThunk
  // getOrderThunk
} from '../../services/burgerSlice';
import { useDispatch } from '../../services/store';

// export const closeModal = () => {};

const App = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getFeedsThunk());
    // Нужна авторизация
    // dispatch(getOrderThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />

        {/* Переделать на защищенные роуты */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />

        {/* Модалки  */}
        <Route
          path='/feed/:number'
          element={
            <Modal title={'Заказ'} onClose={(): void => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Ингридиент'} onClose={(): void => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        {/* Защищенная модалка */}
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title={'Мой заказ'} onClose={(): void => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
