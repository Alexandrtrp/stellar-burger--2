import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // ingredients передается как buns или mains или sauses

  let bunsId: string[] = [];
  if (title === 'Булки') {
    bunsId = ingredients.map((el) => el._id);
  }

  /** TODO: взять переменную из стора */
  const burgerConstructor = {
    bun: {
      _id: bunsId
    },
    ingredients: ingredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) {
      bun._id.forEach((id) => (counters[id] = 2));
      // counters[bun._id] = 2;
    }
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
