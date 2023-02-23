import Link from 'next/link';
import React, { FC, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { signIn, signOut } from 'next-auth/react';
import { PrimeIcons } from 'primereact/api';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

export type NavbarProps = {
	userSignedIn: boolean;
};

const profileItems: MenuItem[] = [
	{
		label: 'Profile',
		icon: PrimeIcons.USER,
	},
	{
		label: 'Sign out',
		icon: PrimeIcons.SIGN_OUT,
		command: () => signOut(),
	},
];

const NavItemTemplate = (item: MenuItem, option: any) => (
	<Link
		className='text-[var(--primary-color)] flex items-center h-16 mx-2 px-3 py-5 lg:py-2 hover:text-[var(--primary-600)] font-semibold text-lg border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors'
		href={item.url as string}
	>
		{item.label}
	</Link>
);

const navItems: MenuItem[] = [
	{
		label: 'Products',
		url: '/products',
		template: NavItemTemplate,
	},
	{
		label: 'Services',
		url: '/services',
		template: NavItemTemplate,
	},
	{
		label: 'About',
		url: '/about',
		template: NavItemTemplate,
	},
	{
		label: 'Contact',
		url: '/contact',
		template: NavItemTemplate,
	},
];

const Navbar: FC<NavbarProps> = ({ userSignedIn }) => {
	const menuRef = useRef<Menu | null>(null);
	return (
		<div className='nav-wrapper w-screen'>
			<Menubar
				model={navItems}
				className='max-w-7xl m-auto px-5 py-0 h-16'
				start={
					<div className='logo-wrapper mr-3 py-2 h-16'>
						<Link href='/' className='font-bold text-4xl '>
							Logo
						</Link>
					</div>
				}
				end={
					<div className='flex items-center'>
						{userSignedIn ? (
							<>
								<div className='profile-wrapper flex items-center justify-center w-16 h-16 border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors cursor-pointer'>
									<i
										className={`${PrimeIcons.SHOPPING_CART} text-lg font-semibold text-[var(--primary-color)] hover:text-[var(--primary-600)]`}
									/>
								</div>
								<div
									className='profile-wrapper flex items-center justify-center w-16 h-16 border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors cursor-pointer'
									onClick={(e) => menuRef.current?.toggle(e)}
								>
									<i
										className={`${PrimeIcons.USER} text-lg font-semibold text-[var(--primary-color)] hover:text-[var(--primary-600)]`}
									/>
									<Menu model={profileItems} popup ref={menuRef} />
								</div>
							</>
						) : (
							<Button onClick={() => signIn()}>Sign in</Button>
						)}
					</div>
				}
			/>
		</div>
	);
};

export default Navbar;
