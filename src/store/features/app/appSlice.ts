import { AnyAction, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppStateModel } from 'models/app.model';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const initialState: AppStateModel = {
  appLoading: false,
  modalState: null,
};

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStateAction: (state, action: PayloadAction<Partial<AppStateModel>>) =>
      ({
        ...state,
        ...action?.payload,
      }) as AppStateModel,
    resetAppStateAction: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state) => ({
        ...state,
        // appLoading: true,
      }))
      .addMatcher(isFulfilledAction, (state) => ({
        ...state,
        // appLoading: false,
      }))
      .addMatcher(isRejectedAction, (state) => ({
        ...state,
        // appLoading: false,
      }));
  },
});

export const { setAppStateAction, resetAppStateAction } = appSlice.actions;

export default appSlice.reducer;
