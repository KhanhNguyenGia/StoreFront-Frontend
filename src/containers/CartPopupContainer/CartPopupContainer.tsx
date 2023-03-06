import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

const CartPopUpContainer = () => {
	// const data = (JSON.parse(sessionStorage.getItem('cart') as string) as string[]) || [];
	const data = ['1', '2', '3'];
	if (!data || (data && data.length === 0)) return <div>Cart is empty</div>;
	return (
		<>
			<div className='cart-list-wrapper flex flex-col gap-3'>
				{data.map((item) => (
					<div className='flex gap-3 items-center'>
						<div className='w-16 h-16 bg-gradient-to-r from-indigo-600 to-sky-700 rounded-lg' />
						<div className='flex flex-col'>
							<div className='text-xl font-semibold'>{item}</div>
							<div className='text-lg'>Price</div>
						</div>
						<div>
							<i className={`${PrimeIcons.TRASH}`} />
						</div>
					</div>
				))}
			</div>
			<Link href='/checkout'>
				<Button className='w-full mt-3 justify-center'>Checkout</Button>
			</Link>
		</>
	);
};

export default CartPopUpContainer;
