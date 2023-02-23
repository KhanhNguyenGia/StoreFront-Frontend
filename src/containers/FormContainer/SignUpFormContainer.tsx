import React, { FC, FormEvent, useRef, useState } from 'react';
import { InputGroup } from '@/components/Inputs';
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

export type SignUpFormContainerProps = {
	csrfToken?: string;
};

const SignUpFormContainer: FC<SignUpFormContainerProps> = ({ csrfToken }) => {
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();
	const formRef = useRef<null | HTMLFormElement>(null);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				body: JSON.stringify({
					email: e.currentTarget.email.value,
					password: e.currentTarget.password.value,
					confirmPassword: e.currentTarget.confirmPassword.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.redirected) {
				router.push(res.url);
			}
			if (!res.ok) {
				throw (await res.json()).message;
			}
		} catch (error) {
			setError(error as string);
		}
		formRef.current?.reset();
	};

	const onChange = () => {
		setError(
			formRef.current?.password.value !== formRef.current?.confirmPassword.value
				? 'Passwords do not match'
				: ''
		);
	};

	return (
		<form ref={formRef} className='flex flex-col gap-5 items-center w-full' onSubmit={onSubmit}>
			{error && (
				<div className='bg-red-200 border-red-400 border-[3px] rounded-lg px-3 py-2 my-5 text-lg w-full'>
					{error}
				</div>
			)}
			<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
			<InputGroup before={[<i className={PrimeIcons.USER} />]} label='Email' id='email'>
				<InputText
					placeholder='example@email.com'
					type='email'
					id='email'
					autoComplete='email'
					name='email'
					required
				/>
			</InputGroup>
			<InputGroup before={[<i className={PrimeIcons.LOCK} />]} label='Password' id='password'>
				<InputText
					placeholder='Super secret password'
					type={visible ? 'text' : 'password'}
					id='password'
					name='password'
					autoComplete='new-password'
					required
					onChange={onChange}
				/>
			</InputGroup>
			<InputGroup
				before={[<i className={PrimeIcons.LOCK} />]}
				label='Confirm Password'
				id='confirmPassword'
			>
				<InputText
					placeholder='Super secret password'
					type={visible ? 'text' : 'password'}
					id='confirmPassword'
					autoComplete='new-password'
					name='confirmPassword'
					required
					onChange={onChange}
				/>
			</InputGroup>
			<label htmlFor='visible' className='flex items-center self-start'>
				<span className='mr-3 select-none'>Show password</span>
				<Checkbox checked={visible} id='visible' onChange={() => setVisible((prev) => !prev)} />
			</label>
			<Button className='w-full justify-center font-medium'>Sign up</Button>
		</form>
	);
};

export default SignUpFormContainer;
