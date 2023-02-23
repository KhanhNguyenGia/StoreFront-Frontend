import React, { FC, useState } from 'react';
import { InputGroup } from '@/components/Inputs';
import { PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

export type SignInFormContainerProps = {
	csrfToken?: string;
	error: string | null;
};

const SignInFormContainer: FC<SignInFormContainerProps> = ({ csrfToken, error }) => {
	const [visible, setVisible] = useState(false);

	return (
		<form
			className='flex flex-col gap-5 items-center w-full'
			method='post'
			action='/api/auth/callback/credentials'
		>
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
					autoComplete='password'
					required
				/>
			</InputGroup>
			<label htmlFor='visible' className='flex items-center self-start'>
				<span className='mr-3 select-none'>Show password</span>
				<Checkbox checked={visible} id='visible' onChange={(e) => setVisible((prev) => !prev)} />
			</label>
			<Button className='w-full justify-center font-medium'>Sign in</Button>
		</form>
	);
};

export default SignInFormContainer;
