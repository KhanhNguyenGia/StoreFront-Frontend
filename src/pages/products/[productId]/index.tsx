import React from 'react';
import { Product } from '@/constants/type';
import { Layout } from '@/layouts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProductViewContainer } from '@/containers/Product';
import BreadCrumpWithPath from '@/components/BreadCrumbWithPath/BreadCrumpWithPath.component';

const ProductPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();
	return (
		<Layout>
			<div className='w-full px-1 md:pl-6 lg:pl-3'>
				<BreadCrumpWithPath path={router.asPath} />
			</div>
			<ProductViewContainer product={product} />
			<div className='lg:mt-8 px-5 md:px-10 lg:px-6'>
				<TabView>
					<TabPanel header='Details'>
						<h2 className='my-5 text-2xl font-bold'>Detail</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
					</TabPanel>
					<TabPanel header='Reviews'>
						<h2 className='my-5 text-2xl font-bold'>Customer reviews</h2>
						<p>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
							sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
							modi.
						</p>
					</TabPanel>
					<TabPanel header='Shipping'>
						<h2 className='my-5 text-2xl font-bold'>Shipping</h2>
						<p>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
							voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
							occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
							mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
							expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
							nihil impedit quo minus.
						</p>
					</TabPanel>
				</TabView>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const paths = Array.from(Array(12)).map((_, i) => ({
		params: {
			productId: `${i + 1}`,
		},
	}));
	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const productId = params?.productId;
	const i = Number(productId);
	const product: Product = {
		id: `${i}`,
		name: `Product ${i}`,
		description: `Product ${i} description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente magni excepturi omnis repellat itaque amet reprehenderit, sit deleniti odio esse ipsa ipsam blanditiis eum numquam error minima labore quos quas?`,
		price: 100,
		imageUrl: Array.from(Array(5)).map((_, k) => `https://picsum.photos/seed/${i + k}/1200/1800`),
	};
	return {
		props: {
			product,
		},
	};
}

export default ProductPage;
