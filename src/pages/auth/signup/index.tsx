import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { FormLayout } from '@/layouts';
import { SignUpFormContainer } from '@/containers/FormContainer';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import authOptions from '@/lib/authOptions';
import { IconMapper } from '@/constants/icon';

export default function SignIn({
	providers,
	csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<FormLayout>
			<div className='form-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-0 lg:-translate-y-0 lg:top-0 lg:left-0 lg:w-1/2 lg:h-full bg-white p-10 rounded-lg shadow-md flex flex-col justify-center'>
				<h2 className='text-2xl font-bold'>
					Welcome to{' '}
					<Link href='/' className='text-[var(--primary-500)]'>
						StoreFront
					</Link>
				</h2>
				<h3 className='text-lg font-semibold text-gray-500 mt-2 mb-5'>
					Already have an account?{' '}
					<Link className='text-[var(--primary-500)] font-bold' href='/auth/signin'>
						Sign in
					</Link>
				</h3>
				<SignUpFormContainer csrfToken={csrfToken} />
				<Divider className='my-5' type='solid' align='center'>
					<span className='px-3 py-2 bg-white text-gray-500'>Or sign in with</span>
				</Divider>
				<div className='flex justify-center gap-5'>
					{Object.values(providers)
						.filter((provider) => provider.id !== 'credentials')
						.map((provider) => {
							const icon = IconMapper[provider.name.toLowerCase() as keyof typeof IconMapper];
							return (
								<div key={provider.name}>
									<Button onClick={() => signIn(provider.id)} className='flex items-center'>
										<i className={`${icon} text-xl mr-3`} />
										<span>{provider.name}</span>
									</Button>
								</div>
							);
						})}
				</div>
			</div>
			<img
				className='w-full h-full object-cover object-center'
				src='https://picsum.photos/seed/picsum/1800/1200/'
			/>
		</FormLayout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const providers = await getProviders();

	return {
		props: {
			providers: providers ?? [],
			csrfToken: await getCsrfToken(context),
		},
	};
}
