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

export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
		platform: string;
	}>;
	prompt(): Promise<void>;
}
