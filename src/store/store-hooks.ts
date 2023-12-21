import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { type RootState, type AppDispatch, store } from './index';

export const makeStore = () => store;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
