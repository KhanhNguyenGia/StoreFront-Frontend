import React, { FC } from 'react';
import type { Product } from '@/constants/type';
import ProductCard from './ProductCard.component';

export type ProductListProps = {
	products: Product[];
	title?: string;
};

const ProductList: FC<ProductListProps> = ({ products, title }) => {
	return (
		<div className='flex flex-wrap py-8'>
			{title && <h2 className='w-full px-5 py-2 text-4xl font-bold'>{title}</h2>}
			{products.map((product) => {
				return <ProductCard product={product} key={product.id} />;
			})}
		</div>
	);
};

export default ProductList;
