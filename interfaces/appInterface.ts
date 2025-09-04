export interface IApiErrorResponse {
  message: string;
  error: string; 
  details: any; 
}

export interface ModalProps<T = unknown> {
  open: boolean;
  close: () => void;
  modalData: T;
  callback?: () => void;
}