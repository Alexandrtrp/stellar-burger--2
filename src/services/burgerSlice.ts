import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'burgers/getIngredientsThunk',
  async () => getIngredientsApi()
);

export const getFeedsThunk = createAsyncThunk(
  'burgers/getFeedsThunk',
  async () => getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk(
  'auth/getOrdersThunk',
  async () => getOrdersApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'burgers/getOrderByNumberThunk',
  async (number: number) => getOrderByNumberApi(number) // число тестовое
);

type TInitialState = {
  ingridients: Array<TIngredient>;
  feed: {};
  orders: Array<TOrder>;
  loading: boolean;
  modalIsOpened: boolean;
  orderData: TOrder | undefined;
  ingredientData: TIngredient | undefined;
  constructorItems: {
    bun: TIngredient;
    ingredients: TIngredient[];
  };
  myOrders: Array<TOrder>;
  myOrderData: TOrder | undefined;
};

const initialState: TInitialState = {
  ingridients: [],
  loading: false,
  feed: {},
  orders: [],
  modalIsOpened: false,
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  ingredientData: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  constructorItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  },
  myOrders: [],
  myOrderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  }
};

const burgerSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setOrderToModal: (state, action) => {
      state.orderData = state.orders.find(
        (order) => order.number === action.payload
      );
    },
    setIngridientToModal: (state, action) => {
      state.ingredientData = state.ingridients.find(
        (el) => el._id === action.payload
      );
    },
    addIngridientsToOrder: (state, action) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingridients = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
        state.orders = action.payload.orders;
      })
      .addCase(getFeedsThunk.rejected, (state) => {
        state.loading = false;
      });
    // builder
    //   .addCase(getOrderByNumberThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(
    //     getOrderByNumberThunk.fulfilled,
    //     (state, action: PayloadAction<TOrder>) => {
    //       state.loading = false;
    //       state.orderData = action.payload;
    //     }
    //   )
    //   .addCase(getOrderByNumberThunk.rejected, (state) => {
    //     state.loading = false;
    //   });

    // Должна быть авторизация для получения этих данных
    builder
      .addCase(getOrdersThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.myOrders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const burgerReducer = burgerSlice.reducer;
export const { setOrderToModal, setIngridientToModal } = burgerSlice.actions;
