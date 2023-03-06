import React from 'react';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { Layout } from '@/layouts';
import Navbar from '@/components/Navbar/Navbar.component';
import { Carousel } from 'primereact/carousel';
import { ProductList } from '@/components/Products';
import { Product } from '@/constants/type';

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<Navbar />
			<Layout>
				{/* <Link href='/products'>
					<Button>Products</Button>
				</Link> */}
				{/* <h2 className='text-3xl font-bold px-5'>Featured</h2> */}
				<Carousel
					className='mt-5'
					value={[
						{ url: 'https://picsum.photos/seed/picsum/1000/500' },
						{ url: 'https://picsum.photos/seed/a/1000/500' },
						{ url: 'https://picsum.photos/seed/b/1000/500' },
						{ url: 'https://picsum.photos/seed/c/1000/500' },
						{ url: 'https://picsum.photos/seed/d/1000/500' },
					]}
					autoplayInterval={3000}
					circular
					numVisible={1}
					showIndicators
					itemTemplate={(item) => (
						<img
							className='w-full object-center object-cover h-[500px] rounded-lg'
							src={item.url}
						/>
					)}
				/>
				<ProductList products={products} title='Latest trend' />
			</Layout>
		</>
	);
};

export async function getStaticProps() {
	const products: Product[] = Array.from(Array(4)).map((_, i) => ({
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

export default IndexPage;
