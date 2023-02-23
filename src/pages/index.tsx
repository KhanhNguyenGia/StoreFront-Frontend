import type { NextPage } from 'next';
import React from 'react';
import { Button } from 'primereact/button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Layout } from '@/layouts';

const IndexPage: NextPage = () => {
	const { data: session } = useSession();
	const whatShouldBeOnNavBar = !session ? (
		<div>
			<Link href='/auth/signin'>
				<Button>Sign in</Button>
			</Link>
		</div>
	) : (
		<div>
			Sign in as {session?.user?.email}
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	);
	return (
		<Layout>
			<div>{whatShouldBeOnNavBar}</div>
			<Link href='/products'>
				<Button>Products</Button>
			</Link>
		</Layout>
	);
};

export default IndexPage;
