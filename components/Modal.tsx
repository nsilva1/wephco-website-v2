import React, { MouseEventHandler } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({
	open,
	onClose,
	children,
}: {
	open: boolean;
	onClose: MouseEventHandler<HTMLElement>;
	children: React.ReactNode;
}) => {
	return (
		// backdrop
		<div
			onClick={onClose}
			className={`fixed inset-0 flex justify-center items-center transition-colors ${
				open ? 'visible bg-black/50' : 'invisible'
			}`}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`bg-white rounded-xl shadow p-10 w-96 transition-all ${
					open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
				}`}
			>
				<button
					onClick={onClose}
					className='absolute cursor-pointer top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600'
				>
					<AiOutlineCloseCircle size={24} />
				</button>
				{children}
			</div>
		</div>
	);
};

export { Modal };
