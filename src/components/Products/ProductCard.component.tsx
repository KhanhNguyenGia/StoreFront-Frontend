import React, { FC } from 'react';
import type { Product } from '@/constants/type';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

export type ProductCardProps = {
	product: Product;
};

const ProductCard: FC<ProductCardProps> = ({
	product: { description, id, name, price, imageUrl },
}) => {
	return (
		<div className='p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
			<div className='p-1 flex flex-col'>
				{imageUrl && imageUrl.length != 0 && (
					<div className='relative w-full overflow-hidden rounded-lg'>
						<img
							src={imageUrl[0]}
							alt='product'
							className='w-full object-cover object-fit rounded-lg hover:duration-[4000ms] hover:scale-[1.15] transition-transform duration-[1500ms]'
						/>
						<Button className='absolute top-5 right-5 bg-white rounded-full p-1 w-12 h-12 flex justify-center items-center'>
							<i className={`${PrimeIcons.HEART} text-black text-xl`} />
						</Button>
					</div>
				)}
				<div className='flex w-full justify-between mt-4 mb-2 text-xl font-bold'>
					<Link href={`/products/${id}`}>{name}</Link>
					<span className='font-normal'>${price}</span>
				</div>
				<p className='line-clamp-3 text-gray-500'>{description}</p>
			</div>
		</div>
	);
};

export default ProductCard;
