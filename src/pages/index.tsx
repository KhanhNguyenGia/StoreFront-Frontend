import type { NextPage } from 'next';
import React from 'react';
import { Button } from 'primereact/button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Layout } from '@/layouts';
import Navbar from '@/components/Navbar/Navbar.component';

const IndexPage: NextPage = () => {
	const { data: session } = useSession();
	return (
		<>
			<Navbar userSignedIn={!!session} />
			<Layout>
				{/* <Link href='/products'>
					<Button>Products</Button>
				</Link> */}
			</Layout>
		</>
	);
};

export default IndexPage;
