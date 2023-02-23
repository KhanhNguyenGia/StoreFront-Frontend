import React, { FC } from 'react';

export type LayoutProps = {
	children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
	return <div className='flex flex-col max-w-7xl px-5 m-auto'>{children}</div>;
};

export default Layout;
