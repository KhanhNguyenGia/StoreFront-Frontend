import React, { FC } from 'react';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import type { MenuItem } from 'primereact/menuitem';

export type BreadCrumpWithPathProps = {
	path: string; // absolute path
};

const BreadCrumpWithPath: FC<BreadCrumpWithPathProps> = ({ path }) => {
	const paths = path.split('/').slice(1);
	const items: MenuItem[] = paths.map((path, i) => {
		const url = '/' + paths.slice(0, i + 1).join('/');
		return {
			label: path.slice(0, 1).toUpperCase() + path.slice(1),
			url: i !== paths.length - 1 ? url : '',
		};
	});
	return (
		<BreadCrumb
			className='border-none text-lg font-semibold'
			model={items}
			home={{
				template: (
					<Link className='flex items-center' href='/'>
						<i className={`${PrimeIcons.HOME} text-lg`} />
					</Link>
				),
				url: '/',
			}}
		/>
	);
};

export default BreadCrumpWithPath;
