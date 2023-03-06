import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FC, useMemo } from 'react';

type CartSummarizeContainerProps = {
	onNext?: () => void;
	onPrev?: () => void;
	index: number;
	subTotal: number;
	payment: string;
};

const CartSummarizeContainer: FC<CartSummarizeContainerProps> = ({
	onNext,
	onPrev,
	index,
	subTotal,
	payment,
}) => {
	const value = [
		{
			tag: 'Subtotal',
			value: subTotal,
		},
		{
			tag: 'Shipping',
			value: 0,
		},
		{
			tag: 'Total',
			value: subTotal,
		},
	];
	return (
		<div className='cart-summarize-wrapper flex flex-col flex-1'>
			{index > 0 && (
				<>
					<h4 className='mt-3 mb-2'>Information</h4>
					<DataTable breakpoint='0px'>
						<Column field='tag' header='Info' />
						<Column field='value' header='Value' />
					</DataTable>
				</>
			)}
			{index > 1 && (
				<>
					<h4 className='mt-3 mb-2'>Summarize</h4>
					<DataTable value={value} breakpoint='0px'>
						<Column field='tag' header='Tag' />
						<Column field='value' header='Value' />
					</DataTable>
				</>
			)}
			{index > 2 && (
				<>
					<h4>Payment Method</h4>
					{payment}
				</>
			)}
			<div className='btn-wrapper flex justify-center gap-5 mt-5'>
				{onPrev && index !== 0 && (
					<Button className='flex-1 justify-center' onClick={onPrev}>
						Back
					</Button>
				)}
				{onNext && index !== 4 && (
					<Button className='flex-1 justify-center' onClick={onNext}>
						Next
					</Button>
				)}
			</div>
		</div>
	);
};

export default CartSummarizeContainer;
