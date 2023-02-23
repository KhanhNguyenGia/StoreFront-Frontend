import React from 'react';
import { Layout } from '@/layouts';
import { InferGetServerSidePropsType } from 'next';
import { Product } from '@/constants/type';
import { ProductList } from '@/components/Products';

const ProductsPage = ({ products }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<Layout>
			<ProductList title={'Popular'} products={products} />
			<ProductList title={'Not popular'} products={products} />
		</Layout>
	);
};

export async function getServerSideProps() {
	// LCM: 12 of 1,2,3,4
	const products: Product[] = Array.from(Array(12)).map((_, i) => ({
		id: `${i + 1}`,
		name: `Product ${i + 1}`,
		description: `Product ${i + 1} description`,
		price: 100,
		imageUrl: Array.from(Array(5)).map((_, k) => `https://picsum.photos/seed/${i + k}/200/300`),
	}));
	return {
		props: {
			products: products,
		},
	};
}

export default ProductsPage;
