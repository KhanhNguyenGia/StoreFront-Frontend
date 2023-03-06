import { FC, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

type CartDetailContainerProps = {
	products: any[];
	columns: any[];
	subTotal: number;
};

const CartDetailContainer: FC<CartDetailContainerProps> = ({ products, columns, subTotal }) => {
	const [selected, setSelected] = useState<any[]>([]);
	return (
		<>
			<DataTable
				value={products}
				stripedRows
				selectionMode='checkbox'
				selection={selected}
				onSelectionChange={(e) => setSelected(e.value)}
				dataKey='id'
				scrollable
			>
				<Column selectionMode='multiple' className='w-12' />
				{columns.map((col) => (
					<Column
						key={col.field}
						field={col.field}
						header={col.header}
						body={
							col.field === 'quantity'
								? (data, options) => (
										<InputText type='number' value={data.quantity} className='w-20' />
								  )
								: undefined
						}
					/>
				))}
				<Column
					key='action'
					header='Action'
					// data is individual product
					className='w-12'
					body={(data, options) => (
						<Button onClick={() => console.log('delete ' + data.id)} severity='danger'>
							<i className={`${PrimeIcons.TRASH}`} />
						</Button>
					)}
				/>
			</DataTable>
			<div className='total w-max ml-auto'>${subTotal}</div>
		</>
	);
};

export default CartDetailContainer;
