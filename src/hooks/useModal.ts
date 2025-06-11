import { AppStateModel } from 'models/app.model';
import { setAppStateAction } from 'store/features/app/appSlice';
import { useAppDispatch } from 'store/store-hooks';

export function useModal() {
  const dispatch = useAppDispatch();

  const openModal = (state: Partial<AppStateModel['modalState']> = null) => {
    dispatch(
      setAppStateAction({
        modalState: { open: true, ...state },
      }),
    );
  };

  const closeModal = () => {
    dispatch(
      setAppStateAction({
        modalState: null,
      }),
    );
  };

  return {
    openModal,
    closeModal,
  };
}
