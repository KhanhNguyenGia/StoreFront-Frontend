import React, { ReactNode } from 'react';
import { FC } from 'react';

export type InputGroupProps = {
	before?: ReactNode[];
	after?: ReactNode[];
	children: ReactNode;
	label?: string;
	id?: string;
};

const InputGroup: FC<InputGroupProps> = ({ before, after, children, label, id }) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			<label className='text-lg font-bold' htmlFor={id}>
				{label}
			</label>
			<div className='p-inputgroup'>
				{before &&
					before.map((item, index) => (
						<span key={index} className='p-inputgroup-addon'>
							{item}
						</span>
					))}
				{children}
				{after &&
					after.map((item, index) => (
						<span key={index} className='p-inputgroup-addon'>
							{item}
						</span>
					))}
			</div>
		</div>
	);
};

export default InputGroup;
