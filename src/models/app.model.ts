import { PopupProps } from 'components/popup/Popup';

// Define a type for the slice state
export interface AppStateModel {
  appLoading: boolean;
  modalState: Partial<PopupProps> | null;
}
