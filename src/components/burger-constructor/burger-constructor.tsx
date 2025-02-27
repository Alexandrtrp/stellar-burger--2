import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const myOrderData = useSelector((state) => state.burgers.constructorItems);
  // console.log(myOrderData.ingredients);

  const constructorItems = useSelector(
    (state) => state.burgers.constructorItems
  );
  // {
  //   bun: myOrderData.bun,
  //   ingredients: myOrderData.ingredients
  // };

  const orderRequest = false;

  const orderModalData = null;
  // useSelector((state) => state.burgers.orderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => navigate(-1);

  const price = useMemo(
    () =>
      // Было v: TConstructorIngredient, непонятно зачем ингридиенту иметь второй айдишник. Поменял на обычный тип TIngredient
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
