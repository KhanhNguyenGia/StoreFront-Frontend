import { Product } from '@/constants/type';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import React, { FC, FormEvent, useState } from 'react';

export type ProductViewContainerProps = {
	product: Product;
};

const ProductViewContainer: FC<ProductViewContainerProps> = ({
	product: { imageUrl, description, id, name, price },
}) => {
	const [count, setCount] = useState(1);
	const [size, setSize] = useState(0);
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('size', size);
		console.log('count', count);
	};
	return (
		<div className='flex lg:flex-row flex-col'>
			<div className='flex-[5] px-3'>
				<Galleria
					value={imageUrl}
					showThumbnails={true}
					// showIndicators
					item={(item: string) => (
						<div className='px-2 w-full'>
							<img
								src={item}
								alt='product'
								className='w-full max-h-[500px] object-cover object-center rounded-lg overflow-hidden'
							/>
						</div>
					)}
					// showIndicatorsOnItem={true}
					// indicatorsPosition={'bottom'}
					showItemNavigators
					showItemNavigatorsOnHover
					showThumbnailNavigators={false}
					numVisible={5}
					responsiveOptions={[
						{
							breakpoint: '640px',
							numVisible: 2,
						},
						{
							breakpoint: '768px',
							numVisible: 3,
						},
						{
							breakpoint: '1024px',
							numVisible: 4,
						},
					]}
					thumbnail={(item: string) => (
						<div className='w-full px-2'>
							<img
								alt=''
								src={item}
								className='object-cover object-center rounded-lg h-32 lg:h-28 w-24 sm:w-36 lg:w-28'
							/>
						</div>
					)}
					circular
					// indicator={() => (
					// 	<i
					// 		className={`${PrimeIcons.CIRCLE_FILL} hover:text-white transition-all cursor-pointer`}
					// 	/>
					// )}
				/>
			</div>
			<form onSubmit={onSubmit} className='flex-[3] flex flex-col py-8 lg:py-0 px-5'>
				<h2 className='text-2xl font-bold'>{name}</h2>
				<div className='mt-2 flex items-center gap-1 text-yellow-400'>
					{[...Array(5)].map((_, i) =>
						i < 4 ? (
							<i key={i} className={PrimeIcons.STAR_FILL} />
						) : (
							<i key={i} className={PrimeIcons.STAR} />
						)
					)}
					<span className='text-sm text-black'>(69)</span>
				</div>
				<p className='text-3xl my-8'>${price}</p>
				<p className='mb-6'>{description}</p>
				<h3 className='text-xl font-bold mt-5 mb-3'>Sizes</h3>
				<SelectButton
					className='w-full'
					optionLabel='name'
					name='size'
					options={[
						{
							name: 'S',
							value: 0,
							className: 'w-1/5',
						},
						{
							name: 'M',
							value: 1,
							className: 'w-1/5',
						},
						{
							name: 'L',
							value: 2,
							className: 'w-1/5',
						},
						{
							name: 'XL',
							value: 3,
							className: 'w-1/5',
						},
						{
							name: '2XL',
							value: 4,
							className: 'w-1/5',
						},
					]}
					value={size}
					onChange={(e) => setSize(e.value)}
				/>
				<h3 className='text-xl font-bold mt-5 mb-3'>Quantity</h3>
				<div>
					<Button
						type='button'
						className='rounded-r-none'
						onClick={() => setCount((prev) => Math.max(1, prev - 1))}
					>
						-
					</Button>
					<InputText
						name='count'
						type='number'
						className='text-center w-1/6 rounded-none'
						value={String(count)}
						onChange={(e) => setCount(Math.min(10, Math.max(1, +e.target.value)))}
					/>
					<Button
						type='button'
						className='rounded-l-none'
						onClick={() => setCount((prev) => Math.min(10, prev + 1))}
					>
						+
					</Button>
				</div>
				<div className='flex w-full mt-8 gap-4'>
					<Button outlined className='justify-center'>
						<i className={`${PrimeIcons.SHOPPING_CART}`} />
					</Button>
					<Button className='justify-center'>Give money</Button>
				</div>
			</form>
		</div>
	);
};

export default ProductViewContainer;
