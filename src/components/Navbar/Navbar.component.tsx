import Link from 'next/link';
import React, { FC, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { signIn, signOut, useSession } from 'next-auth/react';
import { PrimeIcons } from 'primereact/api';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Badge } from 'primereact/badge';
import CartPopUpContainer from '@/containers/CartPopupContainer/CartPopupContainer';

export type NavbarProps = {};

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

const Navbar: FC<NavbarProps> = () => {
	const menuRef = useRef<Menu | null>(null);
	const cartRef = useRef<OverlayPanel | null>(null);
	const { data: session } = useSession();

	return (
		<div className='nav-wrapper w-full absolute top-0'>
			<Menubar
				model={navItems}
				className='max-w-7xl m-auto px-10 py-0 h-16'
				start={
					<div className='logo-wrapper mr-3 py-2 h-16'>
						<Link href='/' className='font-bold text-4xl '>
							Logo
						</Link>
					</div>
				}
				end={
					<div className='flex items-center'>
						<div
							className='profile-wrapper flex items-center justify-center w-16 h-16 border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors cursor-pointer'
							onClick={(e) => cartRef.current?.toggle(e)}
						>
							<i
								className={`${PrimeIcons.SHOPPING_CART} text-xl font-semibold text-[var(--primary-color)] hover:text-[var(--primary-600)] relative`}
							>
								<Badge
									severity='danger'
									className='absolute -top-[2px] text-xs h-4 leading-5 -right-4'
									value={0}
								/>
							</i>
						</div>
						<OverlayPanel ref={cartRef}>
							<CartPopUpContainer />
						</OverlayPanel>
						{session ? (
							<div
								className='profile-wrapper flex items-center justify-center w- h-16 border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors cursor-pointer'
								onClick={(e) => menuRef.current?.toggle(e)}
							>
								<i
									className={`${PrimeIcons.USER} text-xl font-semibold text-[var(--primary-color)] hover:text-[var(--primary-600)]`}
								/>
								<Menu model={profileItems} popup ref={menuRef} />
							</div>
						) : (
							<div
								className='profile-wrapper flex items-center justify-center h-16 border-b-2 border-0 border-solid hover:border-b-[var(--primary-color)] border-transparent transition-colors cursor-pointer text-lg font-semibold text-[var(--primary-color)] hover:text-[var(--primary-600)] px-3'
								onClick={() => signIn()}
							>
								Sign in
							</div>
						)}
					</div>
				}
			/>
		</div>
	);
};

export default Navbar;
