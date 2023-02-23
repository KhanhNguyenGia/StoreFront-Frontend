import React, { FC } from 'react';

export type FormLayoutProps = {
	children?: React.ReactNode;
};

const FormLayout: FC<FormLayoutProps> = ({ children }) => {
	return <div className='relative h-screen w-screen overflow-hidden'>{children}</div>;
};

export default FormLayout;
