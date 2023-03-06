import Navbar from '@/components/Navbar/Navbar.component';
import { Layout } from '@/layouts';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'primereact/button';

const Error404Page: NextPage = () => {
	return (
		<>
			<Head>
				<title>404 - Page not found</title>
			</Head>
			<Navbar />
			<Layout>
				<div className='flex flex-col items-center justify-center h-[calc(100vh_-_64px)] gap-5'>
					<h1 className='text-6xl font-bold'>404</h1>
					<h2 className='text-2xl font-semibold'>Page not found</h2>
					<h3 className='text-gray-500 text-lg w-3/4 sm:w-1/3 text-center'>
						Make sure your URL is correct or the page you are looking for does not exist anymore
					</h3>
					<Link href='/'>
						<Button>Return Home</Button>
					</Link>
				</div>
			</Layout>
		</>
	);
};

export default Error404Page;
