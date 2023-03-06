import Head from 'next/head';
import Navbar from '@/components/Navbar/Navbar.component';
import { Layout } from '@/layouts';
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import { useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { CartDetailContainer, CartSummarizeContainer } from '@/containers/CartCheckoutContainer';

const model: MenuItem[] = [
	{
		label: 'Information',
	},
	{
		label: 'Cart',
	},
	{
		label: 'Select payment method',
	},
	{
		label: 'Confirm order',
	},
	{
		label: 'Completion',
	},
];

const initialProducts = [
	{
		id: 1,
		name: 'Product 1',
		price: 100,
		quantity: 1,
	},
	{
		id: 2,
		name: 'Product 2',
		price: 200,
		quantity: 1,
	},
	{
		id: 3,
		name: 'Product 3',
		price: 300,
		quantity: 1,
	},
	{
		id: 4,
		name: 'Product 4',
		price: 400,
		quantity: 2,
	},
	{
		id: 5,
		name: 'Product 5',
		price: 500,
		quantity: 1,
	},
];

const columns = [
	{
		field: 'id',
		header: 'ID',
	},
	{
		field: 'name',
		header: 'Name',
	},
	{
		field: 'price',
		header: 'Price',
	},
	{
		field: 'quantity',
		header: 'Quantity',
	},
	// {
	// 	field: 'action',
	// 	header: 'Action',
	// },
];

const CheckoutPage = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [products, setProducts] = useState(initialProducts);
	const subTotal = useMemo(
		() => products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
		[products]
	);
	const [payment, setPayment] = useState('');

	const tab = [
		<h2>Input form here</h2>,
		<CartDetailContainer products={products} columns={columns} subTotal={subTotal} />,
		<div className='flex flex-wrap justify-center items-center'>
			{Array.from(Array(4)).map((_, i) => (
				<div className='p-3 w-40 h-40'>
					<Button className='w-full h-full' onClick={() => setPayment(`${i + 1}`)} key={i}>
						Payment method {i + 1}
					</Button>
				</div>
			))}
		</div>,
		<h2>Confirm</h2>,
		<h2>Complete</h2>,
	];

	return (
		<>
			<Head>
				<title>Checkout</title>
			</Head>
			<Navbar />
			<Layout>
				<h2 className='px-5'>Checkout</h2>
				<Steps
					model={model}
					readOnly={false}
					activeIndex={activeIndex}
					onSelect={(e) => setActiveIndex(Math.min(activeIndex, e.index))}
				/>
				<main className='step-wrapper flex gap-3 mt-5 flex-col lg:flex-row'>
					{/* headerClassName aims to hide the PanelHeader since we are using steps */}
					{/* <div className='flex'> */}
					{/* </div> */}
					<div className='flex-[2]'>{tab[activeIndex]}</div>
					<CartSummarizeContainer
						payment={payment}
						subTotal={subTotal}
						index={activeIndex}
						onNext={() => setActiveIndex((prev) => prev + 1)}
						onPrev={() => setActiveIndex((prev) => prev - 1)}
					/>
				</main>
			</Layout>
		</>
	);
};

export default CheckoutPage;
